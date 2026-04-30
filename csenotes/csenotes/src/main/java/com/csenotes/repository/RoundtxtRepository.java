package com.csenotes.repository;

import com.csenotes.entity.Roundtxt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoundtxtRepository extends JpaRepository<Roundtxt, Long> {
    List<Roundtxt> findByCompany_Id(Long companyId);
}
