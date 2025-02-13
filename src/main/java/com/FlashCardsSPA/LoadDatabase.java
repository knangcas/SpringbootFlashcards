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
    CommandLineRunner initDatabase(FlashCardDeckRepository deckRepo) {

        return args -> {
            log.info("Preloading " + deckRepo.save(new FlashCardDeck("FirstDeck")));
        };
    }
}