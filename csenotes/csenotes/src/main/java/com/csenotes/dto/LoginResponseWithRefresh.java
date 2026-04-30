package com.csenotes.dto;

public class LoginResponseWithRefresh {

    private String accessToken;
    private String refreshToken;
    private String username;
    private String name;

    // Constructor
    public LoginResponseWithRefresh(String accessToken, String refreshToken,
                                    String username, String name) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.username = username;
        this.name = name;
    }

    // Getters
    public String getAccessToken() { return accessToken; }
    public String getRefreshToken() { return refreshToken; }
    public String getUsername() { return username; }
    public String getName() { return name; }
}
