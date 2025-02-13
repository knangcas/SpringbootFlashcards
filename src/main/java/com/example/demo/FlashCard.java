package com.example.demo;


import jakarta.persistence.*;

@Entity
@Table(name = "FlashCard")
public class FlashCard {

    public FlashCard() {}

    FlashCard(String question, String answer, long deckID) {
        this.question = question;
        this.answer = answer;
        this.deckID = deckID;
    }
    private String question;

    private String answer;

    @Id
    @GeneratedValue
    Long cardID;




    long deckID;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Long getCardID() {
        return cardID;
    }

    public void setCardID(Long cardID) {
        this.cardID = cardID;
    }

    public long getDeckID() {
        return deckID;
    }

    public void setDeckID(long deckID) {
        this.deckID = deckID;
    }
}
