# FlashCards-SPA
last updated: March 29th, 2025
## About

- This is a web app version of [FlashCards](https://github.com/knangcas/FlashCards)
- VanillaJS implementation with bootstrap css. User can click on the flashcard to "flip" and see the answer.
- Uses Java SpringBoot with embedded h2 database for backend (RESTful api. Will make api docs to accompany the api).
- Currently basic html/css/js for front end, React implemenatation in progress.
- Makes use of Bootstrap framework (for vanilla version)
- Uses JDK17, SprintBoot 3.4.2, Gradle 8.12 

### March 25th, 2025 update
- Started React implementation. (Located in webpageReact directory)
- Fixed CORs to accomidate. 

### February 22nd, 2025 update
- Added Dockerfile 
- Currently still vanillaJS/html/css, not a true SPA yet.

### How to run
```
docker image build -t app .
docker run -d -p 8080:8080 [imageName]
```

This will run the tomcat server for the RESTful API for the app. 
From here, you can navigate to index.html in the webpage directory.

 ### Screenshots

- Updated March 29th, 2025

![Screenshot1](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss8.png?raw=true)

- Restart : returns to the initial state of the deck.
- Next : Users click this when they know the answer.
- Skip : Users click this when they want to skip the answer and come back to it later.

![Screenshot7](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss14.png?raw=true)

- Page view after user reaches the end of the deck without skipping a card.

![Screenshot8](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss15.png?raw=true)

- Page view after user reaches the end of the deck when a card is skipped.

![Screenshot2](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss9.png?raw=true)

- Manage deck page with the current cards in the deck in a list. Delete and Edit card are disabled because there is no selection.

![Screenshot3](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss10.png?raw=true)

- Adding a card page. Added input to both question and answer.

![Screenshot4](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss11.png?raw=true)

- After the addition of a card. "Changes Saved!" pops up with animation after returning to deck list. 

![Screenshot5](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss12.png?raw=true)

- User selection of a card to edit.

![Screenshot6](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss13.png?raw=true)

- The current card to be edited. Save card is disabled because the user has not edited the fields.


