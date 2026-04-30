package com.csenotes.dto;

import java.util.List;

public class RoundDTO {

    private Long id;
    private String roundName;
    private List<QuestionDTO> questions;

    public RoundDTO(Long id, String roundName, List<QuestionDTO> questions) {
        this.id = id;
        this.roundName = roundName;
       // this.questions = questions;
    }

    public Long getId() { return id; }
    public String getRoundName() { return roundName; }
    public List<QuestionDTO> getQuestions() { return questions; }
}
