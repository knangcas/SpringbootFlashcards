package com.FlashCardsSPA.model.exception;

public class FlashCardNotFoundException extends RuntimeException{

    public FlashCardNotFoundException(Long id) {
        super("Could not find flashcard " + id);
    }
}
