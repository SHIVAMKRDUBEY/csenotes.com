package com.csenotes.service.impl;

import com.csenotes.dto.NoteDTO;
import com.csenotes.dto.NotesTopicDTO;
import com.csenotes.entity.Notes;
import com.csenotes.entity.NotesTopic;
import com.csenotes.repository.NotesRepository;
import com.csenotes.repository.NotesTopicRepository;
import com.csenotes.service.NotesService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotesServiceImpl implements NotesService {

    private final NotesRepository notesRepository;
    private final NotesTopicRepository topicRepository;

    public NotesServiceImpl(NotesRepository notesRepository,
                            NotesTopicRepository topicRepository) {
        this.notesRepository = notesRepository;
        this.topicRepository = topicRepository;
    }

    // ===== NOTES =====

    @Override
    public Notes createNotes(Notes note) {
        return notesRepository.save(note);
    }

    @Override
    public List<NoteDTO> getAllNotesBasic() {
        return notesRepository.findAll()
                .stream()
                .map(n -> new NoteDTO(
                        n.getNoteId(),
                        n.getTitle(),
                        n.getImageUrl()))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Notes> getNoteById(Long noteId) {
        return notesRepository.findById(noteId);
    }

    @Override
    public Notes updateNotes(Long noteId, Notes updatedNote) {
        Notes note = notesRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        note.setTitle(updatedNote.getTitle());
        note.setImageUrl(updatedNote.getImageUrl());
        return notesRepository.save(note);
    }

    @Override
    public void deleteNoteById(Long noteId) {
        notesRepository.deleteById(noteId);
    }

    // ===== TOPICS =====

    @Override
    public NotesTopic createTopic(Long noteId, NotesTopic topic) {
        Notes note = notesRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        topic.setNote(note);
        return topicRepository.save(topic);
    }

//    @Override
//    public List<NotesTopic> getTopicsByNote(Long noteId) {
//        return topicRepository.findByNote_NoteIdOrderByOrderNumber(noteId);
//    }
@Override
public List<NotesTopic> getTopicsByNote(Long noteId) {
    //return topicRepository.findByNote_NoteIdOrderByOrderNumber(noteId);
    return topicRepository.findByNote_NoteIdOrderByTopicIdAsc(noteId);
}



    @Override
    public NotesTopic getTopic(Long noteId, Long topicId) {
        NotesTopic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        if (!topic.getNote().getNoteId().equals(noteId)) {
            throw new RuntimeException("Topic does not belong to this note");
        }
        return topic;
    }

    @Override
    public NotesTopic updateTopic(Long noteId, Long topicId, NotesTopic updatedTopic) {
        NotesTopic topic = getTopic(noteId, topicId);

        topic.setTopicName(updatedTopic.getTopicName());
        topic.setContent(updatedTopic.getContent());
        topic.setImageUrl(updatedTopic.getImageUrl());
        topic.setLink(updatedTopic.getLink());
        topic.setOrderNumber(updatedTopic.getOrderNumber());

        return topicRepository.save(topic);
    }

    @Override
    public void deleteTopic(Long noteId, Long topicId) {
        NotesTopic topic = getTopic(noteId, topicId);
        topicRepository.delete(topic);
    }
}
