package com.FlashCardsSPA;


import jakarta.persistence.*;


import java.util.List;

@Entity
@Table(name="FlashCardDeck")
public class FlashCardDeck {

    public List<FlashCard> getCards() {
        return cards;
    }

    public FlashCardDeck() {
    }

    public FlashCardDeck(String name){
        this.name = name;
    }

    public void setCards(List<FlashCard> cards) {
        this.cards = cards;
    }

    public long getDeckID() {
        return deckID;
    }

    public void setDeckID(long deckID) {
        this.deckID = deckID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(mappedBy = "deckID", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<FlashCard> cards;

    @Id
    @GeneratedValue
    @Column(name = "deck_id")
    private long deckID;

    private String name;


}
