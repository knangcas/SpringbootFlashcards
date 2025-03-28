# FlashCards-SPA
last updated: March 25th, 2025
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

![Screenshot1](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss7.png?raw=true)

- Restart : returns to the initial state of the deck.
- Next : Users click this when they know the answer.
- Skip : Users click this when they want to skip the answer and come back to it later.

![Screenshot2](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss2.png?raw=true)

- Study page after reaching the end and skipping 2 cards. User has an option of loading the skipped cards or restarting. 

![Screenshot3](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss3.png?raw=true)

- Manage deck page. User can add new cards, delete cards, or edit cards. In here, I choose to delete the selected card.

![Screenshot4](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss4.png?raw=true)

- User editing a card. Save button will be active once a change has been made to either input field. 

![Screenshot5](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss5.png?raw=true)

- User adding a new card after deleting one (notice 4 cards and "Add Card" instead of "Save Card").

![Screenshot6](https://github.com/knangcas/SpringbootFlashcards/blob/main/screenshots/ss6.png?raw=true)

- The new list after deleting adding the new card.


