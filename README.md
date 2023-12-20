# Awesome ticket challenge

This is AwesomeQA technical challenge built with [NextJs](https://nextjs.org/) for frontend and [FastAPI](https://fastapi.tiangolo.com/) for backend.

# Problem description

Discord is messy. There are moderators who are supposed to answer all questions, but it’s difficult for them to figure out which questions have already been answered and which haven’t.

We’ll now assume we have found a logic that detects which questions are answered and which aren’t (These will be called “Tickets” from now on). We want to provide a simple way for moderators to see these tickets, and go directly to the message in discord to answer it.

# Minimum requirements
- A moderator should be able to easily find & see the questions they haven’t answered yet.
- A moderator should be able to open the link of the message (open ”msg_url”, it’s ok if you can’t open it yourself → you have to be part of the discord server to open it)
- A moderators should be able to remove tickets that are not worth answering, so that they do not show up anymore (Does not need to be persistent → No need to connect to a database or anything, but the state should be saved in the backend)
- Design: On the home page, add [these three buttons](https://www.figma.com/file/eYKjI66zcCp4KyG2kE4yTO/Awesome-challenge?type=design&node-id=0%3A1&mode=dev) in the same style as they are in Figma. The “Tickets” Button should redirect the user to your implemented page with the tickets, the others don’t need to have functionality.

# What to focus on

- Have a look at the data in the json file referenced in the readme to see everything there is to work with
- Proper REST API endpoints
- A user interface that makes it easy for moderators to use this page
  - think about how and what data you can present in order to provide the moderators with the right context

# Getting started

First, run the code below:
```bash
git clone https://github.com/jimlim14/awesomeqa-example.git

cd awesomeqa-example
```

### frontend
here are the steps to setup frontend environment:
```bash
cd frontend

make setup

make run
```
Open [http://localhost:3000](http://localhost:3000)

### backend
here are the steps to setup backend environment:

1. [Download](https://drive.google.com/file/d/1Bvk2mW5t3GfkqTkpURiFpaLuqrUckzUX/view) the ticket data.
2. Place it in backend folder root directory, /backend/data/awesome_tickets.json
3. run the code below
```bash
cd backend

make setup

make run
```
Try it by calling [http://localhost:5001/tickets](http://localhost:5001/tickets) directly or try with Postman (you should be able to see the tickets)


