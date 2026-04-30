package com.csenotes.service;

import com.csenotes.entity.AdminUser;
import com.csenotes.repository.AdminUserRepository;
import com.csenotes.repository.RefreshTokenRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AdminUserService {

    private final AdminUserRepository repo;
    private final RefreshTokenRepository refreshRepo;
    private final PasswordEncoder encoder;
    private final OtpService otpService;

    // ✅ Constructor with OtpService injection
    public AdminUserService(AdminUserRepository repo,
                            RefreshTokenRepository refreshRepo,
                            PasswordEncoder encoder,
                            OtpService otpService) {
        this.repo = repo;
        this.refreshRepo = refreshRepo;
        this.encoder = encoder;
        this.otpService = otpService;
    }

    // ===== Authenticate user (login) =====
    public AdminUser authenticate(String username, String rawPassword) {
        AdminUser user = repo.findByUsername(username).orElse(null);
        if (user == null) return null;

        if (user.isLocked()) throw new RuntimeException("Account locked");

        if (!encoder.matches(rawPassword, user.getPassword())) {
            user.incrementFailedAttempts();
            if (user.getFailedAttempts() >= 5) user.lockForHours(1);
            repo.save(user);
            return null;
        }

        user.resetFailedAttempts();
        repo.save(user);
        return user;
    }

    // ===== Save login info =====
    public void saveLoginInfo(AdminUser user, String ip, String ua) {
        user.setLastLogin(LocalDateTime.now());
        user.setLastLoginIp(ip);
        user.setLastLoginUserAgent(ua);
        repo.save(user);
    }

    // ===== Logout =====
//    public void logout(AdminUser user) {
//        refreshRepo.deleteByAdmin(user);
//    }
//
//    // ===== Reset password using OTP =====
//    public void resetPassword(String email, String otp, String newPassword) {
//        // Verify OTP
//        otpService.verifyOtp(email, otp);
//
//        // Find user by email
//        AdminUser user = repo.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Email not found"));
//
//        // Update password
//        user.setPassword(encoder.encode(newPassword));
//        repo.save(user);
//    }

    public void resetPassword(String email, String newPassword) {

        AdminUser user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        user.setPassword(encoder.encode(newPassword));
        repo.save(user);
    }


//    public void resetUsername(String email, String otp, String newUsername) {
//        // OTP verify
//        otpService.verifyOtp(email, otp);
//
//        // Update username
//        AdminUser user = repo.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Email not found"));
//
//        user.setUsername(newUsername);
//        repo.save(user);
//    }

public void resetUsername(String email, String newUsername) {

    AdminUser user = repo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Email not found"));

    user.setUsername(newUsername);
    repo.save(user);
}

    public AdminUser getProfile(String username) {
        return repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public AdminUser updateProfile(String username, String name, String email, String profileImage) {
        AdminUser user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(name);
        user.setEmail(email);
        if(profileImage != null) user.setProfileImage(profileImage); // optional update
        return repo.save(user);
    }

}
