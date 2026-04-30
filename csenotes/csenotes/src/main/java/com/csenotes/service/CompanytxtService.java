package com.csenotes.service;

import com.csenotes.dto.CompanyDTO;
import com.csenotes.dto.RoundDTO;
import com.csenotes.dto.QuestionDTO;
import com.csenotes.entity.Companytxt;
import com.csenotes.entity.Roundtxt;
import com.csenotes.entity.Questiontxt;

import java.util.List;

public interface CompanytxtService {

    // Company CRUD
    Companytxt createCompany(Companytxt company);
    Companytxt getCompanyById(Long companyId);
    Companytxt updateCompany(Long companyId, Companytxt company);
    void deleteCompany(Long companyId);

    // Rounds CRUD
    Roundtxt createRound(Long companyId, Roundtxt round);
    Roundtxt updateRound(Long companyId, Long roundId, Roundtxt round);
    void deleteRound(Long companyId, Long roundId);

    // Questions CRUD
    Questiontxt createQuestion(Long companyId, Long roundId, Questiontxt question);
    Questiontxt updateQuestion(Long companyId, Long roundId, Long questionId, Questiontxt question);
    void deleteQuestion(Long companyId, Long roundId, Long questionId);
    Questiontxt getQuestionById(Long companyId, Long roundId, Long questionId);

    // DTO for User (read-only)
    List<CompanyDTO> getAllCompaniesDTO();
    List<RoundDTO> getRoundsByCompanyDTO(Long companyId);
    List<QuestionDTO> getQuestionsByRound(Long companyId, Long roundId);
}
