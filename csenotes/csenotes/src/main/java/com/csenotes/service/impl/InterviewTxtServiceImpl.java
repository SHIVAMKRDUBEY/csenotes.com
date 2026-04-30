package com.csenotes.service.impl;

import com.csenotes.dto.SubjectDTO;
import com.csenotes.entity.InterviewTxtQuestion;
import com.csenotes.entity.InterviewTxtSubject;
import com.csenotes.repository.InterviewTxtQuestionRepository;
import com.csenotes.repository.InterviewTxtSubjectRepository;
import com.csenotes.service.InterviewTxtService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewTxtServiceImpl implements InterviewTxtService {

    private final InterviewTxtSubjectRepository subjectRepo;
    private final InterviewTxtQuestionRepository questionRepo;

    public InterviewTxtServiceImpl(
            InterviewTxtSubjectRepository subjectRepo,
            InterviewTxtQuestionRepository questionRepo) {
        this.subjectRepo = subjectRepo;
        this.questionRepo = questionRepo;
    }

    // ===== SUBJECT =====

    @Override
    public InterviewTxtSubject createSubject(InterviewTxtSubject subject) {
        return subjectRepo.save(subject);
    }

    @Override
    public InterviewTxtSubject updateSubject(Long id, InterviewTxtSubject updated) {
        InterviewTxtSubject subject = subjectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        subject.setSubjectName(updated.getSubjectName());
        subject.setDescription(updated.getDescription());
        subject.setImageUrl(updated.getImageUrl());

        return subjectRepo.save(subject);
    }

    @Override
    public void deleteSubject(Long id) {
        subjectRepo.deleteById(id);
    }

    // ===== SUBJECT (PUBLIC) =====

    @Override
    public List<SubjectDTO> getAllSubjectsBasic() {
        return subjectRepo.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SubjectDTO getSubjectByIdBasic(Long id) {
        InterviewTxtSubject subject = subjectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        return mapToDTO(subject);
    }

    // ===== QUESTION =====

    @Override
    public InterviewTxtQuestion addQuestion(Long subjectId,
                                            InterviewTxtQuestion question) {
        InterviewTxtSubject subject = subjectRepo.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        question.setSubject(subject);
        return questionRepo.save(question);
    }

    @Override
    public InterviewTxtQuestion updateQuestion(
            Long subjectId, Long questionId,
            InterviewTxtQuestion updated) {

        InterviewTxtQuestion q = getQuestionById(subjectId, questionId);

        q.setQuestion(updated.getQuestion());
        q.setAnswer(updated.getAnswer());
        q.setOrderNumber(updated.getOrderNumber());

        return questionRepo.save(q);
    }

    @Override
    public void deleteQuestion(Long subjectId, Long questionId) {
        InterviewTxtQuestion q = getQuestionById(subjectId, questionId);
        questionRepo.delete(q);
    }

    @Override
    public List<InterviewTxtQuestion> getQuestionsBySubject(Long subjectId) {
        return questionRepo
                .findBySubject_SubjectIdOrderByOrderNumber(subjectId);
    }

    @Override
    public InterviewTxtQuestion getQuestionById(
            Long subjectId, Long questionId) {

        InterviewTxtQuestion q = questionRepo.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (!q.getSubject().getSubjectId().equals(subjectId)) {
            throw new RuntimeException("Question not under this subject");
        }
        return q;
    }

    // ===== MAPPER =====

    private SubjectDTO mapToDTO(InterviewTxtSubject subject) {
        return new SubjectDTO(
                subject.getSubjectId(),
                subject.getSubjectName(),
                subject.getDescription(),
                subject.getImageUrl(),
                subject.getQuestions()
                        .stream()
                        .map(q -> new SubjectDTO.QuestionDTO(
                                q.getQuestionId(),
                                q.getQuestion(),
                                q.getAnswer(),
                                q.getOrderNumber()))
                        .collect(Collectors.toList())
        );
    }
}
