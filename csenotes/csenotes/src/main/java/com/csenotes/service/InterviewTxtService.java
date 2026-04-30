package com.csenotes.service;

import com.csenotes.dto.SubjectDTO;
import com.csenotes.entity.InterviewTxtQuestion;
import com.csenotes.entity.InterviewTxtSubject;

import java.util.List;

public interface InterviewTxtService {

    // SUBJECT (ADMIN)
    InterviewTxtSubject createSubject(InterviewTxtSubject subject);

    InterviewTxtSubject updateSubject(Long id, InterviewTxtSubject subject);

    void deleteSubject(Long id);

    // SUBJECT (USER)
    List<SubjectDTO> getAllSubjectsBasic();

    SubjectDTO getSubjectByIdBasic(Long id);

    // QUESTION (ADMIN)
    InterviewTxtQuestion addQuestion(Long subjectId, InterviewTxtQuestion question);

    InterviewTxtQuestion updateQuestion(
            Long subjectId, Long questionId, InterviewTxtQuestion question);

    void deleteQuestion(Long subjectId, Long questionId);

    // QUESTION (USER)
    List<InterviewTxtQuestion> getQuestionsBySubject(Long subjectId);

    InterviewTxtQuestion getQuestionById(Long subjectId, Long questionId);
}
