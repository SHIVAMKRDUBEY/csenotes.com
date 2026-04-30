package com.csenotes.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "rounds_txt")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Roundtxt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roundName;

    // Many Rounds -> One Company
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    @JsonIgnoreProperties("rounds")
    private Companytxt company;

    // One Round -> Many Questions
    @OneToMany(mappedBy = "round", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("round")
    private List<Questiontxt> questions;

    // Constructors
    public Roundtxt() {}

    // Getters & Setters
    public Long getId() { return id; }
    public String getRoundName() { return roundName; }
    public void setRoundName(String roundName) { this.roundName = roundName; }
    public Companytxt getCompany() { return company; }
    public void setCompany(Companytxt company) { this.company = company; }
    public List<Questiontxt> getQuestions() { return questions; }
    public void setQuestions(List<Questiontxt> questions) { this.questions = questions; }
}
