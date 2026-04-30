package com.csenotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.csenotes.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
