package com.FlashCardsSPA.model.exception;

public class FlashCardDeckNotFoundException extends RuntimeException{

    FlashCardDeckNotFoundException(Long id) {
        super("flashcard deck not found: " + id);
    }
}
