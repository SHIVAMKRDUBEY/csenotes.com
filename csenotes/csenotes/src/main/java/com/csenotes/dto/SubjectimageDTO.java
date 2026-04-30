package com.csenotes.dto;

import org.springframework.web.multipart.MultipartFile;
import com.csenotes.entity.UploadType;

public class SubjectimageDTO {

    private UploadType uploadType;

    private String companyName;
    private String interviewSubject;
    private String notesSubject;

    private MultipartFile image;
    private String imageText;

    public UploadType getUploadType() { return uploadType; }
    public void setUploadType(UploadType uploadType) { this.uploadType = uploadType; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getInterviewSubject() { return interviewSubject; }
    public void setInterviewSubject(String interviewSubject) { this.interviewSubject = interviewSubject; }

    public String getNotesSubject() { return notesSubject; }
    public void setNotesSubject(String notesSubject) { this.notesSubject = notesSubject; }

    public MultipartFile getImage() { return image; }
    public void setImage(MultipartFile image) { this.image = image; }

    public String getImageText() { return imageText; }
    public void setImageText(String imageText) { this.imageText = imageText; }
}
