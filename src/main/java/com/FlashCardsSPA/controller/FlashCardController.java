package com.FlashCardsSPA.controller;


import com.FlashCardsSPA.model.exception.DeleteOKResponse;
import com.FlashCardsSPA.model.exception.FlashCardDeckNotFoundException;
import com.FlashCardsSPA.model.exception.FlashCardNotFoundResponse;
import com.FlashCardsSPA.repository.FlashCardRepository;
import com.FlashCardsSPA.model.FlashCard;
import com.FlashCardsSPA.model.exception.FlashCardNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@CrossOrigin(origins = "http://localhost:5173")
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

    @DeleteMapping("/flashcards/{id}")
    ResponseEntity<?> deleteOne(@PathVariable Long id) {
        one(id);
        repository.deleteById(id);
        return new ResponseEntity<>(new DeleteOKResponse(""), HttpStatus.NO_CONTENT);
    }

    @PostMapping("/flashcards")
    ResponseEntity<FlashCard> newFlashCard(@RequestBody FlashCard flashcard) {
        return ResponseEntity.ok(repository.save(flashcard));
    }

    @PutMapping ("/flashcards/{id}")
    ResponseEntity<FlashCard> updateFlashCard(@PathVariable("id") Long id, @RequestBody FlashCard flashCard) {
        flashCard.setCardID(id);
        return ResponseEntity.ok(repository.save(flashCard));
    }

    @ExceptionHandler(value = FlashCardNotFoundException.class)
    public ResponseEntity<?> handleFlashCardNotFoundException(FlashCardNotFoundException e) {
        return new ResponseEntity<>(new FlashCardNotFoundResponse(e.getMessage()), HttpStatus.NOT_FOUND);
    }


}
