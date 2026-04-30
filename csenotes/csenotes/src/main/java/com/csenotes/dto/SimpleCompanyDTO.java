package com.csenotes.dto;

public class SimpleCompanyDTO {
    private String name;
    private String logo;

    public SimpleCompanyDTO(String name, String logo) {
        this.name = name;
        this.logo = logo;
    }

    public String getName() { return name; }
    public String getLogo() { return logo; }
}
