package com.csenotes.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "interview_txt_subjects")
public class InterviewTxtSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectId;

    // Subject name (Java, Python, SQL etc.)
    @Column(nullable = false, unique = true)
    private String subjectName;

    // Subject description (long text)
    @Column(columnDefinition = "TEXT")
    private String description;

    // Subject image URL / icon
    private String imageUrl;

    /**
     * One Subject -> Many Interview Questions
     */
    @OneToMany(
            mappedBy = "subject",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<InterviewTxtQuestion> questions;

    // ---------- Constructors ----------

    public InterviewTxtSubject() {
    }

    public InterviewTxtSubject(String subjectName, String description, String imageUrl) {
        this.subjectName = subjectName;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    // ---------- Getters & Setters ----------

    public Long getSubjectId() {
        return subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<InterviewTxtQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<InterviewTxtQuestion> questions) {
        this.questions = questions;
    }
}

