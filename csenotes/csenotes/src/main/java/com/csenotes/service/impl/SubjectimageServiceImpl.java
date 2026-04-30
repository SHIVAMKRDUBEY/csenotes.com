package com.csenotes.service.impl;

import com.csenotes.dto.ImageOnlyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csenotes.dto.SubjectimageDTO;
import com.csenotes.entity.Subjectimage;
import com.csenotes.entity.Image;
import com.csenotes.entity.UploadType;
import com.csenotes.repository.SubjectimageRepository;
import com.csenotes.service.SubjectimageService;
import com.csenotes.util.FileUploadUtil;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubjectimageServiceImpl implements SubjectimageService {

    private static final String IMAGE_SUBDIR = "subjectimages/images";

    @Autowired
    private SubjectimageRepository subjectRepository;

    @Override
    public String saveSubjectimage(SubjectimageDTO dto) throws Exception {

        Subjectimage subject = new Subjectimage();
        subject.setUploadType(dto.getUploadType());

        // ===== VALIDATION LOGIC =====
        if (dto.getUploadType() == UploadType.COMPANY) {
            if (dto.getCompanyName() == null)
                throw new RuntimeException("Company name required");
            subject.setCompanyName(dto.getCompanyName());

        } else if (dto.getUploadType() == UploadType.INTERVIEW) {
            if (dto.getInterviewSubject() == null)
                throw new RuntimeException("Interview subject required");
            subject.setInterviewSubject(dto.getInterviewSubject());

        } else if (dto.getUploadType() == UploadType.NOTES) {
            if (dto.getNotesSubject() == null)
                throw new RuntimeException("Notes subject required");
            subject.setNotesSubject(dto.getNotesSubject());
        }

        // ===== IMAGE =====
        if (dto.getImage() != null && !dto.getImage().isEmpty()) {

            if (!FileUploadUtil.isValidImage(dto.getImage()))
                throw new RuntimeException("Invalid image");

// Save to subjectimages folder
            String fileName = FileUploadUtil.saveFile(IMAGE_SUBDIR, dto.getImage());

            Image image = new Image();
            image.setImageName(fileName);
            image.setImagePath(FileUploadUtil.getFileUrl(fileName, IMAGE_SUBDIR)); // URL generate
            image.setImageType(dto.getImage().getContentType());
            image.setText(dto.getImageText());

            subject.addImage(image);

        }

        subjectRepository.save(subject);

        return "Saved successfully";
    }

    @Override
    public List<Subjectimage> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @Override
    public List<Subjectimage> getByType(String type) {
        return subjectRepository.findByUploadType(UploadType.valueOf(type));
    }

    @Override
    public Subjectimage getSubjectById(Long id) {
        return subjectRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteSubject(Long id) {
        if (subjectRepository.existsById(id)) {
            subjectRepository.deleteById(id);
            return "Deleted successfully";
        }
        return "Subject not found";
    }

    @Override
    public String updateSubject(Long id, SubjectimageDTO dto) throws Exception {

        Subjectimage subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        subject.setUploadType(dto.getUploadType());
        subject.setCompanyName(null);
        subject.setInterviewSubject(null);
        subject.setNotesSubject(null);

        if (dto.getUploadType() == UploadType.COMPANY) {
            subject.setCompanyName(dto.getCompanyName());
        } else if (dto.getUploadType() == UploadType.INTERVIEW) {
            subject.setInterviewSubject(dto.getInterviewSubject());
        } else if (dto.getUploadType() == UploadType.NOTES) {
            subject.setNotesSubject(dto.getNotesSubject());
        }

        subjectRepository.save(subject);

        return "Updated successfully";
    }



    @Override
    public List<ImageOnlyDTO> getAllImagesOnly() {
        List<Subjectimage> subjects = subjectRepository.findAll();
        List<ImageOnlyDTO> imagesDtoList = new ArrayList<>();

        for (Subjectimage subject : subjects) {
            for (Image image : subject.getImages()) {
                imagesDtoList.add(new ImageOnlyDTO(
                        image.getId(),
                        image.getImageName(),
                        image.getImagePath(),
                        image.getImageType(),
                        image.getText()
                ));
            }
        }
        return imagesDtoList;
    }

}
