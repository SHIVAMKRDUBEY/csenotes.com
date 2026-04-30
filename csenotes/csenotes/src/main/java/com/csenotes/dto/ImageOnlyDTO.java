package com.csenotes.dto;

public class ImageOnlyDTO {

    private Long id;
    private String imageName;
    private String imagePath;
    private String imageType;
    private String text;

    // Constructor
    public ImageOnlyDTO(Long id, String imageName, String imagePath, String imageType, String text) {
        this.id = id;
        this.imageName = imageName;
        this.imagePath = imagePath;
        this.imageType = imageType;
        this.text = text;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
