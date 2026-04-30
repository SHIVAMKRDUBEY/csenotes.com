package com.csenotes.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "questions_txt")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Questiontxt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    private Integer orderNumber;

    // Many Questions -> One Round
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "round_id", nullable = false)
    @JsonIgnoreProperties("questions")
    private Roundtxt round;

    // Constructors
    public Questiontxt() {}

    // Getters & Setters
    public Long getId() { return id; }
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
    public Integer getOrderNumber() { return orderNumber; }
    public void setOrderNumber(Integer orderNumber) { this.orderNumber = orderNumber; }
    public Roundtxt getRound() { return round; }
    public void setRound(Roundtxt round) { this.round = round; }
}
