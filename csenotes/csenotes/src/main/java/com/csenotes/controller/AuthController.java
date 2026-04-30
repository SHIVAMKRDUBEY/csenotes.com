//
//package com.csenotes.controller;
//
//import com.csenotes.dto.*;
//import com.csenotes.entity.AdminUser;
//import com.csenotes.entity.RefreshToken;
//import com.csenotes.security.JwtUtil;
//import com.csenotes.service.AdminUserService;
//import com.csenotes.service.OtpService;
//import com.csenotes.service.RefreshTokenService;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.security.core.Authentication;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
////@RequestMapping("/admin")
//@RequestMapping("/api/admin")
//public class AuthController {
//
//    private final AdminUserService adminService;
//    private final RefreshTokenService refreshService;
//    private final JwtUtil jwtUtil;
//    private final OtpService otpService;
//
//    public AuthController(AdminUserService adminService,
//                          RefreshTokenService refreshService,
//                          JwtUtil jwtUtil,
//                          OtpService otpService) { // ✅ constructor injection
//        this.adminService = adminService;
//        this.refreshService = refreshService;
//        this.jwtUtil = jwtUtil;
//        this.otpService = otpService;
//    }
//
//    // 1️⃣ Login
//    @PostMapping("/login")
//    public ResponseEntity<?> login(HttpServletRequest request,
//                                   @RequestBody LoginRequest req) {
//
//        AdminUser user = adminService.authenticate(req.getUsername(), req.getPassword());
//        if (user == null) return ResponseEntity.status(401).build();
//
//        String accessToken = jwtUtil.generateToken(
//                user.getUsername(),
//                request.getRemoteAddr(),
//                request.getHeader("User-Agent")
//        );
//
//        // Save login info
//        adminService.saveLoginInfo(user,
//                request.getRemoteAddr(),
//                request.getHeader("User-Agent"));
//
//        // Create refresh token
//        RefreshToken refreshToken = refreshService.create(user);
//
//        return ResponseEntity.ok(new LoginResponseWithRefresh(
//                accessToken,
//                refreshToken.getToken(),
//                user.getUsername(),
//                user.getName()
//        ));
//    }
//
//    // 2️⃣ Refresh access token
//    @PostMapping("/refresh")
//    public ResponseEntity<?> refresh(@RequestBody RefreshRequest req,
//                                     HttpServletRequest request) {
//        RefreshToken rt = refreshService.verify(req.getRefreshToken());
//
//        String accessToken = jwtUtil.generateToken(
//                rt.getAdmin().getUsername(),
//                request.getRemoteAddr(),
//                request.getHeader("User-Agent")
//        );
//
//        return ResponseEntity.ok(new LoginResponseWithRefresh(
//                accessToken,
//                rt.getToken(),
//                rt.getAdmin().getUsername(),
//                rt.getAdmin().getName()
//        ));
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(@RequestBody RefreshRequest req) {
//        try {
//            RefreshToken rt = refreshService.verify(req.getRefreshToken());
//            refreshService.delete(rt.getAdmin());
//        } catch (Exception e) {
//            // already logged out or invalid token
//            return ResponseEntity.ok(
//                    new MessageResponse("Already logged out")
//            );
//        }
//
//        return ResponseEntity.ok(
//                new MessageResponse("Logged out successfully")
//        );
//    }
//
//    @GetMapping("/profile")
//    public ResponseEntity<?> getProfile(Authentication auth) {
//        String username = auth.getName(); // ye ab kaam karega
//        AdminUser user = adminService.getProfile(username);
//        return ResponseEntity.ok(new ProfileResponse(
//                user.getUsername(), user.getName(), user.getEmail(), user.getProfileImage()
//        ));
//    }
//
//    @PutMapping("/profile")
//    public ResponseEntity<?> updateProfile(Authentication auth,
//                                           @RequestBody UpdateProfileRequest req) {
//        AdminUser updated = adminService.updateProfile(
//                auth.getName(), req.getName(), req.getEmail(), req.getProfileImage()
//        );
//        return ResponseEntity.ok(new MessageResponse("Profile updated successfully"));
//    }
//
//
//    // Request OTP
////    @PostMapping("/request-otp")
////    public ResponseEntity<?> requestOtp(@RequestBody ForgotRequest req) {
////        otpService.sendOtp(req.getEmail());
////        return ResponseEntity.ok(new MessageResponse("OTP sent to your email"));
////    }
//
//    @PostMapping("/request-otp")
//    public ResponseEntity<?> requestOtp(@RequestBody ForgotRequest req) {
//        otpService.generateOtp(req.getEmail());   // ✅ अब method exist करता है
//        otpService.sendOtpEmail(req.getEmail());  // OTP email पर भेजो
//        return ResponseEntity.ok(new MessageResponse("OTP sent to your email"));
//    }
//
//
////    @PostMapping("/forgot-reset")
////    public ResponseEntity<?> forgotReset(@RequestBody ResetPasswordRequest req) {
////
////        // 1️⃣ Generate OTP internally
////        otpService.generateOtp(req.getEmail());
////
////        // 2️⃣ Send OTP to email
////        otpService.sendOtpEmail(req.getEmail()); // only passed email
////
////        // 3️⃣ Verify OTP sent by admin
////        otpService.verifyOtp(req.getEmail(), req.getOtp());
////
////        // 4️⃣ Update username and password
////        if (req.getNewPassword() != null && !req.getNewPassword().isEmpty()) {
////            adminService.resetPassword(req.getEmail(), req.getOtp(), req.getNewPassword());
////        }
////
////        if (req.getNewUsername() != null && !req.getNewUsername().isEmpty()) {
////            adminService.resetUsername(req.getEmail(), req.getOtp(), req.getNewUsername());
////        }
////
////        return ResponseEntity.ok(new MessageResponse("Username and Password successfully updated"));
////    }
//
//
//
//
//    @PostMapping("/forgot-reset")
//    public ResponseEntity<?> forgotReset(@RequestBody ResetPasswordRequest req) {
//
//        // ✅ Sirf ek baar OTP verify
//        otpService.verifyOtp(req.getEmail(), req.getOtp());
//
//        if (req.getNewPassword() != null && !req.getNewPassword().isEmpty()) {
//            adminService.resetPassword(req.getEmail(), req.getNewPassword());
//        }
//
//        if (req.getNewUsername() != null && !req.getNewUsername().isEmpty()) {
//            adminService.resetUsername(req.getEmail(), req.getNewUsername());
//        }
//
//        return ResponseEntity.ok(
//                new MessageResponse("Username and Password successfully updated")
//        );
//
//    }
//
//}










package com.csenotes.controller;

import com.csenotes.dto.*;
import com.csenotes.entity.AdminUser;
import com.csenotes.entity.RefreshToken;
import com.csenotes.security.JwtUtil;
import com.csenotes.service.AdminUserService;
import com.csenotes.service.OtpService;
import com.csenotes.service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AuthController {

    private final AdminUserService adminService;
    private final RefreshTokenService refreshService;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;

    public AuthController(AdminUserService adminService,
                          RefreshTokenService refreshService,
                          JwtUtil jwtUtil,
                          OtpService otpService) {
        this.adminService = adminService;
        this.refreshService = refreshService;
        this.jwtUtil = jwtUtil;
        this.otpService = otpService;
    }

    // 🔥 COMMON METHOD (IP FIX)
    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null) {
            return xfHeader.split(",")[0];
        }
        return request.getRemoteAddr();
    }

    // 1️⃣ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(HttpServletRequest request,
                                   @RequestBody LoginRequest req) {

        AdminUser user = adminService.authenticate(req.getUsername(), req.getPassword());
        if (user == null) return ResponseEntity.status(401).build();

        String ip = getClientIp(request);

        String accessToken =jwtUtil.generateToken(user.getUsername());
//        jwtUtil.generateToken(
//                user.getUsername(),
//                ip,
//                request.getHeader("User-Agent")
//        );

        adminService.saveLoginInfo(user, ip, request.getHeader("User-Agent"));

        RefreshToken refreshToken = refreshService.create(user);

        return ResponseEntity.ok(new LoginResponseWithRefresh(
                accessToken,
                refreshToken.getToken(),
                user.getUsername(),
                user.getName()
        ));
    }

    // 2️⃣ REFRESH
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshRequest req,
                                     HttpServletRequest request) {

        RefreshToken rt = refreshService.verify(req.getRefreshToken());

        String ip = getClientIp(request);

        String accessToken = jwtUtil.generateToken(rt.getAdmin().getUsername());
//                jwtUtil.generateToken(
//                rt.getAdmin().getUsername(),
//                ip,
//                request.getHeader("User-Agent")
//        );

        return ResponseEntity.ok(new LoginResponseWithRefresh(
                accessToken,
                rt.getToken(),
                rt.getAdmin().getUsername(),
                rt.getAdmin().getName()
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody RefreshRequest req) {
        try {
            RefreshToken rt = refreshService.verify(req.getRefreshToken());
            refreshService.delete(rt.getAdmin());
        } catch (Exception e) {
            return ResponseEntity.ok(new MessageResponse("Already logged out"));
        }
        return ResponseEntity.ok(new MessageResponse("Logged out successfully"));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication auth) {
        AdminUser user = adminService.getProfile(auth.getName());
        return ResponseEntity.ok(new ProfileResponse(
                user.getUsername(), user.getName(), user.getEmail(), user.getProfileImage()
        ));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(Authentication auth,
                                           @RequestBody UpdateProfileRequest req) {
        adminService.updateProfile(
                auth.getName(), req.getName(), req.getEmail(), req.getProfileImage()
        );
        return ResponseEntity.ok(new MessageResponse("Profile updated successfully"));
    }

    @PostMapping("/request-otp")
    public ResponseEntity<?> requestOtp(@RequestBody ForgotRequest req) {
        otpService.generateOtp(req.getEmail());
        otpService.sendOtpEmail(req.getEmail());
        return ResponseEntity.ok(new MessageResponse("OTP sent to your email"));
    }

    @PostMapping("/forgot-reset")
    public ResponseEntity<?> forgotReset(@RequestBody ResetPasswordRequest req) {

        otpService.verifyOtp(req.getEmail(), req.getOtp());

        if (req.getNewPassword() != null && !req.getNewPassword().isEmpty()) {
            adminService.resetPassword(req.getEmail(), req.getNewPassword());
        }

        if (req.getNewUsername() != null && !req.getNewUsername().isEmpty()) {
            adminService.resetUsername(req.getEmail(), req.getNewUsername());
        }

        return ResponseEntity.ok(
                new MessageResponse("Username and Password successfully updated")
        );
    }
}