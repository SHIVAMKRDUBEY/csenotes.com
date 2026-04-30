package com.csenotes.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subjectimage")
public class Subjectimage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private UploadType uploadType;

    // COMPANY
    private String companyName;

    // INTERVIEW
    private String interviewSubject;

    // NOTES
    private String notesSubject;

    @OneToMany(mappedBy = "subject",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();

    // ===== Helper Method =====
    public void addImage(Image image) {
        images.add(image);
        image.setSubject(this);
    }

    // ===== Getters & Setters =====

    public Long getId() {
        return id;
    }

    public UploadType getUploadType() {
        return uploadType;
    }

    public void setUploadType(UploadType uploadType) {
        this.uploadType = uploadType;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getInterviewSubject() {
        return interviewSubject;
    }

    public void setInterviewSubject(String interviewSubject) {
        this.interviewSubject = interviewSubject;
    }

    public String getNotesSubject() {
        return notesSubject;
    }

    public void setNotesSubject(String notesSubject) {
        this.notesSubject = notesSubject;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
