package com.csenotes.controller;

import com.csenotes.dto.ImageOnlyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.csenotes.dto.SubjectimageDTO;
import com.csenotes.entity.Subjectimage;
import com.csenotes.service.SubjectimageService;

import java.util.List;

@RestController
@RequestMapping("/api/subjectsimage")
public class ImageController {

    @Autowired
    private SubjectimageService subjectService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> create(@ModelAttribute SubjectimageDTO dto) throws Exception {
        return ResponseEntity.ok(subjectService.saveSubjectimage(dto));
    }

    @GetMapping
    public ResponseEntity<List<Subjectimage>> getAll() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Subjectimage>> getByType(@PathVariable String type) {
        return ResponseEntity.ok(subjectService.getByType(type));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subjectimage> getById(@PathVariable Long id) {
        return ResponseEntity.ok(subjectService.getSubjectById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return ResponseEntity.ok(subjectService.deleteSubject(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id,
                                         @ModelAttribute SubjectimageDTO dto) throws Exception {
        return ResponseEntity.ok(subjectService.updateSubject(id, dto));
    }


    @GetMapping("/images-only")
    public ResponseEntity<List<ImageOnlyDTO>> getImagesOnly() {
        List<ImageOnlyDTO> images = subjectService.getAllImagesOnly();
        return ResponseEntity.ok(images);
    }

}
