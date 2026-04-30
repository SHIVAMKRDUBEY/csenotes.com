package com.csenotes.dto;

public class NoteDTO {

    private Long noteId;
    private String title;
    private String imageUrl;

    public NoteDTO(Long noteId, String title, String imageUrl) {
        this.noteId = noteId;
        this.title = title;
        this.imageUrl = imageUrl;
    }

    public Long getNoteId() {
        return noteId;
    }

    public String getTitle() {
        return title;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
