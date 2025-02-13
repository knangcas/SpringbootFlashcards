package com.FlashCardsSPA;

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

    @GetMapping("/FlashCardDecks")
    ResponseEntity<List<FlashCardDeck>> all() {
        return new ResponseEntity<>((List<FlashCardDeck>)repository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/FlashCardDecks/{id}")
    FlashCardDeck one(@PathVariable long id) {
        return repository.findById(id).orElseThrow(() -> new FlashCardDeckNotFoundException(id));
    }

}
