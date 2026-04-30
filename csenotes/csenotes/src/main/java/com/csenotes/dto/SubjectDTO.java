package com.csenotes.dto;

import java.util.List;

public class SubjectDTO {

    private Long subjectId;
    private String subjectName;
    private String description;
    private String imageUrl;
    private List<QuestionDTO> questions;

    public SubjectDTO(Long subjectId, String subjectName,
                      String description, String imageUrl,
                      List<QuestionDTO> questions) {
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.description = description;
        this.imageUrl = imageUrl;
       // this.questions = questions;
    }

    // ===== INNER QUESTION DTO =====
    public static class QuestionDTO {
        private Long questionId;
        private String question;
        private String answer;
        private Integer orderNumber;

        public QuestionDTO(Long questionId, String question,
                           String answer, Integer orderNumber) {
            this.questionId = questionId;
            this.question = question;
            this.answer = answer;
            this.orderNumber = orderNumber;
        }

        public Long getQuestionId() {
            return questionId;
        }

        public String getQuestion() {
            return question;
        }

        public String getAnswer() {
            return answer;
        }

        public Integer getOrderNumber() {
            return orderNumber;
        }
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public List<QuestionDTO> getQuestions() {
        return questions;
    }
}
