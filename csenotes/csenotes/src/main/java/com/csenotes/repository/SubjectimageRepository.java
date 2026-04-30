package com.csenotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.csenotes.entity.Subjectimage;

import java.util.List;

public interface SubjectimageRepository extends JpaRepository<Subjectimage, Long> {

    List<Subjectimage> findByUploadType(com.csenotes.entity.UploadType uploadType);

    List<Subjectimage> findByCompanyName(String companyName);

    List<Subjectimage> findByInterviewSubject(String interviewSubject);

    List<Subjectimage> findByNotesSubject(String notesSubject);
}
