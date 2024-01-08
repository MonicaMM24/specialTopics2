# Angular CRUD Application with Rest API

Here will be the application for the Special Topics Homework

**Project Overview**
This project will be an application created for executing CRUD operations. 
Management of tutorial id, title,description, status.
CRUD operations
- Create, retrieve,update, delete turorials
Search bar to find tutorials by title with the help of Elasticsearch

**Technologies used**

*Angular 13* TypeScript-based web framework

*RxJS 7* - library for reactive programming using Observables, to make it easier to 
compose asynchronous or callback-based code

*TypeScript* - programming language that builds on JavaScript

*Elasticsearch*

*NodeJS* - for the Backend



**REST APIs Structure**

POST /api/tutorials create new Tutorial POST /api/tutorials

GET /api/tutorials/:id retrieve a Tutorial by :id GET /api/tutorials/:id

PUT /api/tutorials/:id update a Tutorial by :id PUT /api/tutorials/:id

GET /api/tutorials?title=[keyword] find all Tutorials which title contains keyword

