# Bank account

## Description

Simple bank account application (API and interface).
The possible operations are the next ones:

- Deposit money
- Withdraw money
- Display the movements in the bank account

The application contains two parts, the backend and the frontend.

- The backend has been done using [Nest](https://nestjs.com/) (Node.js framework for building server-side applications)
- The frontend has been developed using [React](https://reactjs.org/) (A JS library for building user interfaces)

Each part contains its own README.md with instructions to install and run the app. Even so, in this document, there are instructions to run both of them at the same time to test them.

> In order to test it, the backend needs a connection with the **postgresql** database.

## Example
<img width="945" alt="Screen Shot 2022-08-15 at 13 57 52 PM" src="https://user-images.githubusercontent.com/18525658/184649984-037f8b6c-f749-4291-89c3-ebe5e6302227.png">

## BACKEND

### Installation

```
$ cd bank-backend
$ npm install
```

### Run the app

```
$ npm start
```

Application is listening on port 3001
(Without postgresql connection it will fail)

### Run tests

```
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

(e2e tests are not well configured because of lack of time. It would be necessary to connect to a test database to run them fine)

## FRONTEND

Despite being a "backend" job, one of the requirements was to display the account movements.
My decision was to consume the API from a web client using React because of my experience with this technology.

### Installation

```
$ cd bank-frontend
$ npm install
```

### Run the app

```
$ npm start
```

Open the next url in your browser: http://localhost:3000

### Run tests

```
$ npm test
```

## Observations

- There were a lot of different solutions for this technical test. I decided to implement a REST API because of its flexibility for connecting with diverse clients.
- Although my first decision was to use Express directly, I changed my opinion for several reasons. The first one, Nest is the framework that I am using in my current project. It is very helpful and scalable. And, although its configuration may be a challenge the first time, the framework contains a lot of helpful tools (like validating decorators) that the developer must create using Express.
- **e2e** tests should have been included in this project. Using _Cypress_ or _supertest_. But I had to decide to leave them to the end and I had no more time to deal with them.
- About backend. The test coverage is enough for this exercise, in my opinion, but it is true that there are some branches that unit tests do not cover like some "error" cases.
- About frontend. Unit tests are not enough. I spent more time with the backend part.

## User guide

### Authentication (Sign Up and Sign In)
- Sign up is required
- CardId must contain 16 digits (like a credit card)
- PIN must contain 4 digits
- Authentication formulary is validated by the backend (API)

### Movements
- Only integers are allowed in amount form
- Two options: INCOME and WITHDRAW
- The results are displayed as expected.
