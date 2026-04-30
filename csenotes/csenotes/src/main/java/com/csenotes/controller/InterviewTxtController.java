package com.csenotes.controller;

import com.csenotes.dto.SubjectDTO;
import com.csenotes.entity.InterviewTxtQuestion;
import com.csenotes.entity.InterviewTxtSubject;
import com.csenotes.service.InterviewTxtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview-txt")
@CrossOrigin("*")
public class InterviewTxtController {

    private final InterviewTxtService service;

    public InterviewTxtController(InterviewTxtService service) {
        this.service = service;
    }

    // ================= SUBJECT =================

    @PostMapping("/subjects")
    public InterviewTxtSubject createSubject(@RequestBody InterviewTxtSubject subject) {
        return service.createSubject(subject);
    }

    @PutMapping("/subjects/{id}")
    public InterviewTxtSubject updateSubject(
            @PathVariable Long id,
            @RequestBody InterviewTxtSubject subject) {
        return service.updateSubject(id, subject);
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<String> deleteSubject(@PathVariable Long id) {
        service.deleteSubject(id);
        return ResponseEntity.ok("Subject deleted successfully");
    }

    // ================= SUBJECT (PUBLIC READ) =================

    @GetMapping("/subjects")
    public List<SubjectDTO> getAllSubjectsBasic() {
        return service.getAllSubjectsBasic();
    }

    @GetMapping("/subjects/{id}")
    public SubjectDTO getSubjectByIdBasic(@PathVariable Long id) {
        return service.getSubjectByIdBasic(id);
    }

    // ================= QUESTION =================

    @PostMapping("/subjects/{subjectId}/questions")
    public InterviewTxtQuestion addQuestion(
            @PathVariable Long subjectId,
            @RequestBody InterviewTxtQuestion question) {
        return service.addQuestion(subjectId, question);
    }

    @PutMapping("/subjects/{subjectId}/questions/{questionId}")
    public InterviewTxtQuestion updateQuestion(
            @PathVariable Long subjectId,
            @PathVariable Long questionId,
            @RequestBody InterviewTxtQuestion question) {
        return service.updateQuestion(subjectId, questionId, question);
    }

    @DeleteMapping("/subjects/{subjectId}/questions/{questionId}")
    public ResponseEntity<String> deleteQuestion(
            @PathVariable Long subjectId,
            @PathVariable Long questionId) {
        service.deleteQuestion(subjectId, questionId);
        return ResponseEntity.ok("Question deleted successfully");
    }

    // ================= QUESTION (PUBLIC READ) =================

    @GetMapping("/subjects/{subjectId}/questions")
    public List<InterviewTxtQuestion> getQuestionsBySubject(
            @PathVariable Long subjectId) {
        return service.getQuestionsBySubject(subjectId);
    }

    @GetMapping("/subjects/{subjectId}/questions/{questionId}")
    public InterviewTxtQuestion getQuestionById(
            @PathVariable Long subjectId,
            @PathVariable Long questionId) {
        return service.getQuestionById(subjectId, questionId);
    }
}

