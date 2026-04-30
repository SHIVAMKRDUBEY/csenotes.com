package com.csenotes.service.impl;

import com.csenotes.dto.CompanyDTO;
import com.csenotes.dto.RoundDTO;
import com.csenotes.dto.QuestionDTO;
import com.csenotes.entity.Companytxt;
import com.csenotes.entity.Roundtxt;
import com.csenotes.entity.Questiontxt;
import com.csenotes.repository.CompanytxtRepository;
import com.csenotes.repository.RoundtxtRepository;
import com.csenotes.repository.QuestiontxtRepository;
import com.csenotes.service.CompanytxtService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanytxtServiceImpl implements CompanytxtService {

    private final CompanytxtRepository companyRepo;
    private final RoundtxtRepository roundRepo;
    private final QuestiontxtRepository questionRepo;

    public CompanytxtServiceImpl(CompanytxtRepository companyRepo,
                                 RoundtxtRepository roundRepo,
                                 QuestiontxtRepository questionRepo) {
        this.companyRepo = companyRepo;
        this.roundRepo = roundRepo;
        this.questionRepo = questionRepo;
    }

    // ===== COMPANY =====
    @Override
    public Companytxt createCompany(Companytxt company) { return companyRepo.save(company); }

    @Override
    public Companytxt getCompanyById(Long companyId) {
        return companyRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }

    @Override
    public Companytxt updateCompany(Long companyId, Companytxt updated) {
        Companytxt c = getCompanyById(companyId);
        c.setName(updated.getName());
        c.setLogo(updated.getLogo());
        return companyRepo.save(c);
    }

    @Override
    public void deleteCompany(Long companyId) { companyRepo.deleteById(companyId); }

    // ===== ROUND =====
    @Override
    public Roundtxt createRound(Long companyId, Roundtxt round) {
        Companytxt c = getCompanyById(companyId);
        round.setCompany(c);
        return roundRepo.save(round);
    }

    @Override
    public Roundtxt updateRound(Long companyId, Long roundId, Roundtxt updated) {
        Roundtxt r = roundRepo.findById(roundId)
                .orElseThrow(() -> new RuntimeException("Round not found"));
        r.setRoundName(updated.getRoundName());
        return roundRepo.save(r);
    }

    @Override
    public void deleteRound(Long companyId, Long roundId) {
        Roundtxt r = roundRepo.findById(roundId)
                .orElseThrow(() -> new RuntimeException("Round not found"));
        roundRepo.delete(r);
    }

    // ===== QUESTION =====
    @Override
    public Questiontxt createQuestion(Long companyId, Long roundId, Questiontxt question) {
        Roundtxt r = roundRepo.findById(roundId)
                .orElseThrow(() -> new RuntimeException("Round not found"));
        question.setRound(r);
        return questionRepo.save(question);
    }

    @Override
    public Questiontxt updateQuestion(Long companyId, Long roundId, Long questionId, Questiontxt updated) {
        Questiontxt q = getQuestionById(companyId, roundId, questionId);
        q.setQuestion(updated.getQuestion());
        q.setAnswer(updated.getAnswer());
        q.setOrderNumber(updated.getOrderNumber());
        return questionRepo.save(q);
    }

    @Override
    public void deleteQuestion(Long companyId, Long roundId, Long questionId) {
        Questiontxt q = getQuestionById(companyId, roundId, questionId);
        questionRepo.delete(q);
    }

    @Override
    public Questiontxt getQuestionById(Long companyId, Long roundId, Long questionId) {
        Questiontxt q = questionRepo.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        if (!q.getRound().getId().equals(roundId))
            throw new RuntimeException("Question not under this round");
        return q;
    }

    // ===== DTO FOR USER =====
    @Override
    public List<CompanyDTO> getAllCompaniesDTO() {
        return companyRepo.findAll().stream()
                .map(this::mapCompanyToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RoundDTO> getRoundsByCompanyDTO(Long companyId) {
        return roundRepo.findByCompany_Id(companyId).stream()
                .map(this::mapRoundToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<QuestionDTO> getQuestionsByRound(Long companyId, Long roundId) {
        return questionRepo.findByRound_IdOrderByOrderNumber(roundId).stream()
                .map(this::mapQuestionToDTO)
                .collect(Collectors.toList());
    }

    // ===== MAPPERS =====
    private CompanyDTO mapCompanyToDTO(Companytxt c) {
        List<RoundDTO> rounds = c.getRounds() == null ? List.of()
                : c.getRounds().stream().map(this::mapRoundToDTO).toList();
        return new CompanyDTO(c.getId(), c.getName(), c.getLogo(), rounds);
    }

    private RoundDTO mapRoundToDTO(Roundtxt r) {
        List<QuestionDTO> questions = r.getQuestions() == null ? List.of()
                : r.getQuestions().stream().map(this::mapQuestionToDTO).toList();
        return new RoundDTO(r.getId(), r.getRoundName(), questions);
    }

    private QuestionDTO mapQuestionToDTO(Questiontxt q) {
        return new QuestionDTO(q.getId(), q.getQuestion(), q.getAnswer(), q.getOrderNumber());
    }
}
