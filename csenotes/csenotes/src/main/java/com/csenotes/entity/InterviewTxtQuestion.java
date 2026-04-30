package com.csenotes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "interview_txt_questions")
public class InterviewTxtQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    // Interview question text
    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    // Answer text (Hindi / English)
    @Column(columnDefinition = "TEXT")
    private String answer;

    // Order number (easy -> hard)
    private Integer orderNumber;

    // Question creation time
    private LocalDateTime createdAt;

    /**
     * Many Questions -> One Subject
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    @JsonBackReference
    private InterviewTxtSubject subject;

    // ---------- Constructors ----------

    public InterviewTxtQuestion() {
        this.createdAt = LocalDateTime.now();
    }

    public InterviewTxtQuestion(String question, String answer) {
        this.question = question;
        this.answer = answer;
        this.createdAt = LocalDateTime.now();
    }

    // ---------- Getters & Setters ----------

    public Long getQuestionId() {
        return questionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public InterviewTxtSubject getSubject() {
        return subject;
    }

    public void setSubject(InterviewTxtSubject subject) {
        this.subject = subject;
    }
}

