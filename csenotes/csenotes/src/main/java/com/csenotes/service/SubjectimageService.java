package com.csenotes.service;

import com.csenotes.dto.ImageOnlyDTO;
import com.csenotes.dto.SubjectimageDTO;
import com.csenotes.entity.Subjectimage;
import java.util.List;

public interface SubjectimageService {

    String saveSubjectimage(SubjectimageDTO dto) throws Exception;

    List<Subjectimage> getAllSubjects();

    List<Subjectimage> getByType(String type);

    Subjectimage getSubjectById(Long id);

    String deleteSubject(Long id);

    String updateSubject(Long id, SubjectimageDTO dto) throws Exception;



    List<ImageOnlyDTO> getAllImagesOnly();

}
