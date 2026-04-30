package com.csenotes.dto;

import java.util.List;

public class CompanyDTO {

    private Long id;
    private String name;
    private String logo;
    private List<RoundDTO> rounds;

    public CompanyDTO(Long id, String name, String logo, List<RoundDTO> rounds) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.rounds = rounds;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getLogo() { return logo; }
    public List<RoundDTO> getRounds() { return rounds; }
}
