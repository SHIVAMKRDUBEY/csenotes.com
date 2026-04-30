package com.csenotes.repository;

import com.csenotes.entity.InterviewTxtQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewTxtQuestionRepository
        extends JpaRepository<InterviewTxtQuestion, Long> {

    List<InterviewTxtQuestion>
    findBySubject_SubjectIdOrderByOrderNumber(Long subjectId);
}
