# Ye_Olde_Quiz

:beer::beer::beer:

Ye Olde Quiz is a quiz website inspired by everyone's favorite activity...a Pub Quiz!

This app makes use of the [Open Trivia Database](https://opentdb.com/)

Deployment (render): https://yeoldequiz.onrender.com

## Motivation :muscle:

This project is part of the futureproof curriculum for LAP 3 project. We were tasked with the creation of a quiz website.

## Installation and Usage

Note: This repository contains the backend of the application.

You can find the repository for the connected UI [here](https://github.com/PollyFenne/Ye_olde_quiz_frontend).

### Installation :inbox_tray:

- Clone or download this repository.
- `npm install` to install the dependencies

### Usage :open_file_folder:

- `npm run dev` to start the server
- Ensure the [frontend UI](https://github.com/PollyFenne/Ye_olde_quiz_frontend) is running  
- In your chosen browser (Chrome recommended) navigate to 'http://localhost:8080'

## Technologies :desktop_computer:

- [express](https://www.npmjs.com/package/express)
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dayjs](https://www.npmjs.com/package/dayjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [randomstring](https://www.npmjs.com/package/randomstring)
- [PostgreSQL](https://www.postgresql.org/)
- [uuid](https://www.npmjs.com/package/uuid)
- Testing [jest](https://www.npmjs.com/package/jest) and [SuperTest](https://www.npmjs.com/package/supertest)
- Deployment: 

## Process :bar_chart:

- Started with a day planning, using tools such as Figma and creating todo tasks in a Trello board.
- Split up work into backend and frontend:
- Once server was working, testing was done.
- Implimented Socket.io on both the front and back end at the same time.
- Worked together to fix any bugs and finalise small featues.
- Deployed website.

# Challeges and Wins

### Challenges :no_entry:

### Wins :trophy:

Able to hold multiple players in the same room

Displaying running users scores after each round

## Bugs :bug:

### Multiple games at one go

Having multiple games running simultaneously will cause some bugs

## Future Features :timer_clock:

### More testing on the backend, especially with socket events

### Display an overall score board

### Displaying questions 1 by 1

Currently each round is displayed as one form with all the questions for that round to aid with simplicity.

A future feature would be to impliment functionality that allows each question to be displayed, then the answer for that question, and then for the next question appear.

### Game Customisation

The API has two types of questions: multiple choice and true/false. Currently users don't have an option for choosing the type of question they want and there will just be a mix.

A feature feature would be to allow users to select just one type of question or to have a mix.

Allow playerrs to also choose the number of rounds to play and the number of questions in each round.

## Contributors

@adamminchella :man_technologist:
@JLP2000 :man_technologist:
@PollyFenne :woman_technologist:
@shedp :man_technologist:
