package com.csenotes.service;

import com.csenotes.entity.AdminUser;
import com.csenotes.entity.RefreshToken;
import com.csenotes.exception.UnauthorizedException;
import com.csenotes.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class RefreshTokenService {

    private final RefreshTokenRepository repo;
    private static final long REFRESH_TOKEN_EXP = 1000 * 60 * 60 * 8; // 8 hours

    public RefreshTokenService(RefreshTokenRepository repo) {
        this.repo = repo;
    }

    public RefreshToken create(AdminUser admin) {
        // Check if token already exists
        Optional<RefreshToken> existing = repo.findAll()
                .stream()
                .filter(t -> t.getAdmin().getId().equals(admin.getId()))
                .findFirst();

        RefreshToken token;
        if (existing.isPresent()) {
            // Update existing token
            token = existing.get();
            token.setToken(UUID.randomUUID().toString());
            token.setExpiryDate(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXP));
        } else {
            // Create new token
            token = new RefreshToken();
            token.setAdmin(admin);
            token.setToken(UUID.randomUUID().toString());
            token.setExpiryDate(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXP));
        }

        return repo.save(token);
    }


    // 2️⃣ Verify & rotate token
    public RefreshToken verify(String tokenStr) {
        RefreshToken rt = repo.findByToken(tokenStr)
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));

        if (rt.getExpiryDate().before(new Date())) {
            repo.delete(rt);
            throw new UnauthorizedException("Refresh token expired");
        }

        // Rotate token: delete old, create new
        AdminUser admin = rt.getAdmin();
        repo.delete(rt);
        return create(admin);
    }

    // 3️⃣ Delete token on logout
    public void delete(AdminUser admin) {
        repo.deleteByAdmin(admin);
    }
}
