package com.csenotes.dto;

public class QuestionDTO {

    private Long id;
    private String question;
    private String answer;
    private Integer orderNumber;

    public QuestionDTO(Long id, String question, String answer, Integer orderNumber) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.orderNumber = orderNumber;
    }

    public Long getId() { return id; }
    public String getQuestion() { return question; }
    public String getAnswer() { return answer; }
    public Integer getOrderNumber() { return orderNumber; }
}
