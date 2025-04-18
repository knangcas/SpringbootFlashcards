package com.FlashCardsSPA;

import com.FlashCardsSPA.model.FlashCard;
import com.FlashCardsSPA.model.FlashCardDeck;
import com.FlashCardsSPA.repository.FlashCardDeckRepository;
import com.FlashCardsSPA.repository.FlashCardRepository;
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
            log.info("Preloading " + cardRepo.save(new FlashCard("In react, class for html elements is referred to as what?", "className", 1)));
            log.info("Preloading " + cardRepo.save(new FlashCard( "What is the difference between --- and == in javascript?", "=== is more strict and does not do type conversions like == does", 1)));
            log.info("Preloading " + cardRepo.save(new FlashCard("What is the left most digit in the three digit HTTP status code for client related errors?", "4xx", 1)));
            log.info("Preloading " + cardRepo.save(new FlashCard("What is penetration testing?", "Testing done by ethical hackers in which the goal is to try and breach a system.", 1)));
            log.info("Preloading " + cardRepo.save(new FlashCard("If you have a child, will you name them JSON?", "Of course.", 1)));
            log.info("Preloading " + cardRepo.save(new FlashCard("True or False. C# uses PascalCase for naming methods", "True", 1)));
            log.info("Preloading " + cardRepo.save(new FlashCard("What does de-referencing a pointer do?" , "retrieves the value stored at the pointer location", 1)));
            log.info("Preloading " + cardRepo.save(new FlashCard("What is polymorphism?", "Polymorphism is when a subclass overrides methods of it's superclass", 1)));
        };
    }
}