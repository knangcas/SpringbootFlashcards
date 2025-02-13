package com.FlashCardsSPA;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class FlashCardController {


    FlashCardRepository repository;

    FlashCardController(FlashCardRepository r) {this.repository = r;}

    @GetMapping("/flashcards")
    ResponseEntity<List<FlashCard>> all() {
        return new ResponseEntity<>((List<FlashCard>) repository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/flashcards/{id}")
    FlashCard one(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(()-> new FlashCardNotFoundException(id));
    }

    @PostMapping("/flashcards")
    ResponseEntity<FlashCard> newFlashCard(@RequestBody FlashCard flashcard) {
        return ResponseEntity.ok(repository.save(flashcard));
    }


}
