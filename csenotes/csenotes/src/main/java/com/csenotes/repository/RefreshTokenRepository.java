package com.csenotes.repository;

import com.csenotes.entity.RefreshToken;
import com.csenotes.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByAdmin(AdminUser admin);
}
