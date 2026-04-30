package com.csenotes.dto;

import java.time.LocalDateTime;

public class NotesTopicDTO {

    private Long topicId;
    private String topicName;
    private String content;
    private String imageUrl;
    private String link;
    private Integer orderNumber;
    private LocalDateTime createdAt;

    public NotesTopicDTO(Long topicId, String topicName, String content,
                         String imageUrl, String link, Integer orderNumber, LocalDateTime createdAt) {
        this.topicId = topicId;
        this.topicName = topicName;
        this.content = content;
        this.imageUrl = imageUrl;
        this.link = link;
        this.orderNumber = orderNumber;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getTopicId() { return topicId; }
    public String getTopicName() { return topicName; }
    public String getContent() { return content; }
    public String getImageUrl() { return imageUrl; }
    public String getLink() { return link; }
    public Integer getOrderNumber() { return orderNumber; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
