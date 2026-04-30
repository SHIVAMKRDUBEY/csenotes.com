package com.csenotes.controller;

import com.csenotes.dto.CompanyDTO;
import com.csenotes.dto.RoundDTO;
import com.csenotes.dto.QuestionDTO;
import com.csenotes.entity.Companytxt;
import com.csenotes.entity.Roundtxt;
import com.csenotes.entity.Questiontxt;
import com.csenotes.service.CompanytxtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company-txt")
@CrossOrigin("*")
public class CompanyTxtController {

    @Autowired
    private CompanytxtService service;

    // ================= COMPANY =================
    @PostMapping("/admin/company")
    public Companytxt createCompany(@RequestBody Companytxt company) {
        return service.createCompany(company);
    }

    @GetMapping("/companies")
    public List<CompanyDTO> getAllCompanies() {
        return service.getAllCompaniesDTO();
    }

    @GetMapping("/admin/company/{companyId}")
    public Companytxt getCompanyById(@PathVariable Long companyId) {
        return service.getCompanyById(companyId);
    }

    @PutMapping("/admin/company/{companyId}")
    public Companytxt updateCompany(@PathVariable Long companyId, @RequestBody Companytxt company) {
        return service.updateCompany(companyId, company);
    }

    @DeleteMapping("/admin/company/{companyId}")
    public String deleteCompany(@PathVariable Long companyId) {
        service.deleteCompany(companyId);
        return "Company deleted successfully";
    }

    // ================= ROUND =================
    @PostMapping("/admin/company/{companyId}/round")
    public Roundtxt createRound(@PathVariable Long companyId, @RequestBody Roundtxt round) {
        return service.createRound(companyId, round);
    }

    @GetMapping("/company/{companyId}/rounds")
    public List<RoundDTO> getRounds(@PathVariable Long companyId) {
        return service.getRoundsByCompanyDTO(companyId);
    }

    @PutMapping("/admin/company/{companyId}/round/{roundId}")
    public Roundtxt updateRound(@PathVariable Long companyId,
                                @PathVariable Long roundId,
                                @RequestBody Roundtxt round) {
        return service.updateRound(companyId, roundId, round);
    }

    @DeleteMapping("/admin/company/{companyId}/round/{roundId}")
    public String deleteRound(@PathVariable Long companyId, @PathVariable Long roundId) {
        service.deleteRound(companyId, roundId);
        return "Round deleted successfully";
    }

    // ================= QUESTION =================
    @PostMapping("/admin/company/{companyId}/round/{roundId}/question")
    public Questiontxt createQuestion(@PathVariable Long companyId,
                                      @PathVariable Long roundId,
                                      @RequestBody Questiontxt question) {
        return service.createQuestion(companyId, roundId, question);
    }

    @GetMapping("/company/{companyId}/round/{roundId}/questions")
    public List<QuestionDTO> getQuestions(@PathVariable Long companyId,
                                          @PathVariable Long roundId) {
        return service.getQuestionsByRound(companyId, roundId);
    }

    @PutMapping("/admin/company/{companyId}/round/{roundId}/question/{questionId}")
    public Questiontxt updateQuestion(@PathVariable Long companyId,
                                      @PathVariable Long roundId,
                                      @PathVariable Long questionId,
                                      @RequestBody Questiontxt question) {
        return service.updateQuestion(companyId, roundId, questionId, question);
    }

    @GetMapping("/admin/company/{companyId}/round/{roundId}/question/{questionId}")
    public Questiontxt getQuestionById(@PathVariable Long companyId,
                                       @PathVariable Long roundId,
                                       @PathVariable Long questionId) {
        return service.getQuestionById(companyId, roundId, questionId);
    }

    @DeleteMapping("/admin/company/{companyId}/round/{roundId}/question/{questionId}")
    public String deleteQuestion(@PathVariable Long companyId,
                                 @PathVariable Long roundId,
                                 @PathVariable Long questionId) {
        service.deleteQuestion(companyId, roundId, questionId);
        return "Question deleted successfully";
    }



    // ================= ROUND =================
// GET specific round by companyId and roundId
    @GetMapping("/company/{companyId}/round/{roundId}")
    public RoundDTO getRoundById(@PathVariable Long companyId,
                                 @PathVariable Long roundId) {
        // Company ke sare rounds fetch karo
        List<RoundDTO> rounds = service.getRoundsByCompanyDTO(companyId);

        // roundId ke basis pe round find karo
        return rounds.stream()
                .filter(r -> r.getId().equals(roundId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Round not found"));
    }

}
