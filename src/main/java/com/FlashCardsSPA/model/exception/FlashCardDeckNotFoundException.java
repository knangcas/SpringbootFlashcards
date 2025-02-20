package com.FlashCardsSPA.model.exception;

public class FlashCardDeckNotFoundException extends RuntimeException{

    public FlashCardDeckNotFoundException(Long id) {
        super("flashcard deck not found: " + id);
    }
}
