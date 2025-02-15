package com.FlashCardsSPA;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(FlashCardDeckRepository deckRepo, FlashCardRepository cardRepo) {

        return args -> {
            log.info("Preloading " + deckRepo.save(new FlashCardDeck("FirstDeck")));
            log.info("Preloading " + cardRepo.save(new FlashCard("What is 1+1", "2", 1)));
            log.info("Preloading " + cardRepo.save(new FlashCard("What does await do in javascript?", "Block", 1)));
        };
    }
}