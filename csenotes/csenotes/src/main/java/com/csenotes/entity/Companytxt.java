package com.csenotes.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "companies_txt")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Companytxt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String logo;

    // One Company -> Many Rounds
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("company")
    private List<Roundtxt> rounds;

    // Constructors
    public Companytxt() {}

    // Getters & Setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }
    public List<Roundtxt> getRounds() { return rounds; }
    public void setRounds(List<Roundtxt> rounds) { this.rounds = rounds; }
}
