package com.FlashCardsSPA;

public class FlashCardNotFoundException extends RuntimeException{

    FlashCardNotFoundException(Long id) {
        super("Could not find flashcard " + id);
    }
}
