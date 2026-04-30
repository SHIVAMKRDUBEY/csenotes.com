package com.csenotes.repository;

import com.csenotes.entity.Questiontxt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestiontxtRepository extends JpaRepository<Questiontxt, Long> {
    List<Questiontxt> findByRound_IdOrderByOrderNumber(Long roundId);
}
