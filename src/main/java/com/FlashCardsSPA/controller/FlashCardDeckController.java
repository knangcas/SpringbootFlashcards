package com.FlashCardsSPA.controller;

import com.FlashCardsSPA.repository.FlashCardDeckRepository;
import com.FlashCardsSPA.model.FlashCardDeck;
import com.FlashCardsSPA.model.exception.FlashCardDeckNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class FlashCardDeckController {

    FlashCardDeckRepository repository;

    FlashCardDeckController(FlashCardDeckRepository r) {
        repository = r;
    }

    @GetMapping("/flashcarddecks")
    ResponseEntity<List<FlashCardDeck>> all() {
        return new ResponseEntity<>((List<FlashCardDeck>)repository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/flashcarddecks/{id}")
    FlashCardDeck one(@PathVariable long id) {
        return repository.findById(id).orElseThrow(() -> new FlashCardDeckNotFoundException(id));
    }

}
