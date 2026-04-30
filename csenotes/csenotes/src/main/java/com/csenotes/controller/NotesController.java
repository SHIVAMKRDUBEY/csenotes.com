package com.csenotes.controller;

import com.csenotes.dto.NoteDTO;
import com.csenotes.dto.NotesTopicDTO;
import com.csenotes.entity.Notes;
import com.csenotes.entity.NotesTopic;
import com.csenotes.service.NotesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/txtnotes")
@CrossOrigin("*")
public class NotesController {




    private final NotesService service;

    public NotesController(NotesService service) {
        this.service = service;
    }

    // ===== NOTES =====

    @PostMapping
    public Notes createNotes(@RequestBody Notes note) {
        return service.createNotes(note);
    }

    @GetMapping
    public List<NoteDTO> getAllNotes() {
        return service.getAllNotesBasic();
    }

    @GetMapping("/{noteId}")
    public Optional<Notes> getNoteById(@PathVariable Long noteId) {
        return service.getNoteById(noteId);
    }

    @PutMapping("/{noteId}")
    public Notes updateNotes(@PathVariable Long noteId,
                             @RequestBody Notes note) {
        return service.updateNotes(noteId, note);
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<String> deleteNote(@PathVariable Long noteId) {
        service.deleteNoteById(noteId);
        return ResponseEntity.ok("Note deleted successfully");
    }
    // ===== TOPICS =====

    @PostMapping("/{noteId}/topics")
    public NotesTopic createTopic(@PathVariable Long noteId,
                                  @RequestBody NotesTopic topic) {
        return service.createTopic(noteId, topic);
    }

//    @GetMapping("/{noteId}/topics")
//    public List<NotesTopic> getTopicsByNote(@PathVariable Long noteId) {
//        return service.getTopicsByNote(noteId);
//    }


@GetMapping("/{noteId}/topics")
public List<NotesTopicDTO> getTopics(@PathVariable Long noteId) {
    List<NotesTopic> topics = service.getTopicsByNote(noteId); // ✅ object से call
    return topics.stream()
            .map(t -> new NotesTopicDTO(
                    t.getTopicId(),
                    t.getTopicName(),
                    t.getContent(),
                    t.getImageUrl(),
                    t.getLink(),
                    t.getOrderNumber(),
                    t.getCreatedAt()
            ))
            .collect(Collectors.toList());
}


    @GetMapping("/{noteId}/topics/{topicId}")
    public NotesTopic getTopic(@PathVariable Long noteId,
                               @PathVariable Long topicId) {
        return service.getTopic(noteId, topicId);
    }

    @PutMapping("/{noteId}/topics/{topicId}")
    public NotesTopic updateTopic(@PathVariable Long noteId,
                                  @PathVariable Long topicId,
                                  @RequestBody NotesTopic topic) {
        return service.updateTopic(noteId, topicId, topic);
    }

    @DeleteMapping("/{noteId}/topics/{topicId}")
    public ResponseEntity<String> deleteTopic(@PathVariable Long noteId,
                                              @PathVariable Long topicId) {
        service.deleteTopic(noteId, topicId);
        return ResponseEntity.ok("Topic deleted successfully");
    }
}
