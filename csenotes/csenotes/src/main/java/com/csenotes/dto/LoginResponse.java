package com.csenotes.dto;

public class LoginResponse {

    private String token;
    private String username;
    private String name;

    public LoginResponse(String token, String username, String name) {
        this.token = token;
        this.username = username;
        this.name = name;
    }

    public String getToken() { return token; }
    public String getUsername() { return username; }
    public String getName() { return name; }
}
