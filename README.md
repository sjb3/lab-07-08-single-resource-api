![cf](https://i.imgur.com/7v5ASc8.png) lab-06-cowsay-http-server
======

[![](https://img.shields.io/badge/Issues%3F-Ask%20for%20Help!-55cbe0.svg)](https://github.com/codefellows/seattle-javascript-401n1/issues/new)

# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Build Tool Instructions
* create a package.json
* include an .eslintrc
* include a .gitignore
* create a gulpfile
 * have a lint task for running eslint
 * have a test task for running mocha
 * have a nodemon task that restarts your server any time a change has been bade to your **.js** files
 * have a default task for running the lint and mocha tasks

# Directions
* Create directorys to oranize your modules 
 * lib, model, route, test
* Create a HTTP Server using the http module
* Create a Object Constructor that creates a _simple resource_ with at least 3 properties
 * must have an `id` property that is set to a **node-uuid** unique id
* Create a body parser that uses Promises to parse the json in the body of `POST`, `PUT`, or `DELETE` requests
* Create a url parser that retruns a promise and uses nodes `url` and `querystring` modules parse the request url
* Create a Router Contructor that manages requests to `GET`, `POST`, `PUT`, and `DELETE` Requests
* Create a route for doing **CRUD** operations on your _simple resource_
 * when resource's are created thaty should be stored on an object ussing the `uuid` as the key

## Server Endpoints
### /api/simple-resource-name
* `POST` request
 * pass data as stringifed json in the body of a post requet to create a resource
* `GET` request 
 * pass an `?id=<uuid>` in the query string to retrive a specific resource as json
* `DELETE` request
 * pass data as stringifed json that contains `{id:<uuid>}` in the body of a post requet to update delete a resource

## Tests 
* your test should start and stop your server
* write a test for your api that returns a status code of 404 for routes that have not been registered
* write a test for you `/api/simple-resource-name` for the methods
 * `GET` - test 404 'not found' for id not found
 * `GET` - test 400 'bad request' for no id provided
 * `GET` - test 200 `{<data>}` for a vaild id 
 * `POST` - test 400 'bad request' for no `body provided` or `invald body`
 * `POST` - test 200 `{<data>}` for a vaild id 

## Bonus
* **2pts** a `GET` request to `/api/simple-resource-name/all` should retrun an array of all of the ids for that resource

