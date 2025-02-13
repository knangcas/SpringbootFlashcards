package com.example.demo;

public class FlashCardDeckNotFoundException extends RuntimeException{

    FlashCardDeckNotFoundException(Long id) {
        super("flashcard deck not found: " + id);
    }
}
