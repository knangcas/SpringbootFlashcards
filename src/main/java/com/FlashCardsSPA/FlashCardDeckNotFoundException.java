package com.FlashCardsSPA;

public class FlashCardDeckNotFoundException extends RuntimeException{

    FlashCardDeckNotFoundException(Long id) {
        super("flashcard deck not found: " + id);
    }
}
