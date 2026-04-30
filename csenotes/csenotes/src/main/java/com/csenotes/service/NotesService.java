package com.csenotes.service;

import com.csenotes.dto.NoteDTO;
import com.csenotes.entity.Notes;
import com.csenotes.entity.NotesTopic;

import java.util.List;
import java.util.Optional;

public interface NotesService {

    // NOTES
    Notes createNotes(Notes note);

    List<NoteDTO> getAllNotesBasic();

    Optional<Notes> getNoteById(Long noteId);

    Notes updateNotes(Long noteId, Notes note);

    void deleteNoteById(Long noteId);


    // TOPICS
    NotesTopic createTopic(Long noteId, NotesTopic topic);

   // List<NotesTopic> getTopicsByNote(Long noteId);
   List<NotesTopic> getTopicsByNote(Long noteId);

    NotesTopic getTopic(Long noteId, Long topicId);

    NotesTopic updateTopic(Long noteId, Long topicId, NotesTopic topic);

    void deleteTopic(Long noteId, Long topicId);
}
