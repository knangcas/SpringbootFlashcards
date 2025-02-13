package com.example.demo;

public class FlashCardNotFoundException extends RuntimeException{

    FlashCardNotFoundException(Long id) {
        super("Could not find flashcard " + id);
    }
}
