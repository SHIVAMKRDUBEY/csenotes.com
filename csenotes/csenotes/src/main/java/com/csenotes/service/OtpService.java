package com.csenotes.service;

import com.csenotes.entity.AdminUser;
import com.csenotes.repository.AdminUserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private final AdminUserRepository userRepo;
    private final EmailService emailService;

    private final Map<String, OtpEntry> otpMap = new ConcurrentHashMap<>();
    private static final int OTP_EXP_MINUTES = 10;

    public OtpService(AdminUserRepository userRepo, EmailService emailService) {
        this.userRepo = userRepo;
        this.emailService = emailService;
    }

    // ✅ Generate OTP and store internally
    public String generateOtp(String email) {
        AdminUser user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        // Generate 6-digit OTP
        String otpCode = String.format("%06d", new Random().nextInt(999999));

        // Store OTP in memory with expiry
        otpMap.put(email, new OtpEntry(otpCode, LocalDateTime.now().plusMinutes(OTP_EXP_MINUTES)));

        return otpCode; // return the OTP if needed
    }

    // ✅ Send OTP email
    public void sendOtpEmail(String email) {
        OtpEntry entry = otpMap.get(email);
        if (entry == null) throw new RuntimeException("OTP not generated yet");
        emailService.send(email, "Your OTP Code", "Your OTP for reset is: " + entry.getCode());
    }

    // ✅ Verify OTP
    public boolean verifyOtp(String email, String otp) {
        OtpEntry entry = otpMap.get(email);
        if (entry == null) throw new RuntimeException("OTP not requested");

        if (entry.getExpiry().isBefore(LocalDateTime.now())) {
            otpMap.remove(email);
            throw new RuntimeException("OTP expired");
        }

        if (!entry.getCode().equals(otp)) throw new RuntimeException("Invalid OTP");

        otpMap.remove(email); // OTP used
        return true;
    }

    private static class OtpEntry {
        private final String code;
        private final LocalDateTime expiry;

        public OtpEntry(String code, LocalDateTime expiry) {
            this.code = code;
            this.expiry = expiry;
        }

        public String getCode() { return code; }
        public LocalDateTime getExpiry() { return expiry; }
    }
}
