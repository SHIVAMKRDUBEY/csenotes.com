package com.csenotes.dto;

public class MessageResponse {

    private String message;
    private String status; // optional extra field

    // 1️⃣ Constructor with 1 argument
    public MessageResponse(String message) {
        this.message = message;
    }

    // 2️⃣ Constructor with 2 arguments
    public MessageResponse(String message, String status) {
        this.message = message;
        this.status = status;
    }

    // 3️⃣ Default constructor (Spring JSON ke liye)
    public MessageResponse() {}

    // Getters
    public String getMessage() { return message; }
    public String getStatus() { return status; }

    // Optional setters
    public void setMessage(String message) { this.message = message; }
    public void setStatus(String status) { this.status = status; }
}
