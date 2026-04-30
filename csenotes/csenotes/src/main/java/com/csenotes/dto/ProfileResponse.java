package com.csenotes.dto;

public class ProfileResponse {
    private String username;
    private String name;
    private String email;
    private String profileImage;

    public ProfileResponse(String username, String name, String email, String profileImage) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.profileImage = profileImage;
    }
    // getters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
