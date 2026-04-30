package com.csenotes.repository;

import com.csenotes.entity.NotesTopic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotesTopicRepository extends JpaRepository<NotesTopic, Long> {

   // List<NotesTopic> findByNote_NoteIdOrderByOrderNumber(Long noteId);
   List<NotesTopic> findByNote_NoteIdOrderByTopicIdAsc(Long noteId);

}
