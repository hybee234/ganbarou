# ganbarou
Project 3 - MERN Stack

<a ID="readme-top"></a>

<div align="center">

# Ganabrou! 
## Let's do our best!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=mit)](https://opensource.org/licenses/MIT)
[![Node.js Badge](https://img.shields.io/badge/Node.js-393?style=for-the-badge&logo=nodedotjs&logoColor=fff)](https://nodejs.org/en)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

Project 3 - MERN Stack

</div>

## Description

This application was provided as a fully functioning Google Books Search Engine built with with RESTful API integrations. The exercise was to refactor the application to make use of the latest technology - namely Apollo/GraphQl. This was the last change required to bring this application to the MERN stack.

High level features of the application are:
* Search for books using Google Books API
* Ability for user to Login or Sign in (application will conditionally render components depending on log in state)
* Ability for users to save books to their profile for later viewing
* Ability for users to delete books from their saved list


## Table of contents


- [User Story](#user-story)
- [User Acceptance Critieria](#user-acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)
- [Contributing](#contributing)
- [Testing](#testing)
- [Questions](#questions)

## User Story <a ID="user-story"></a>

```md
AS AN avid reader

I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## User Acceptance Criteria

### This application was developed with the below User acceptance criteria:

```
GIVEN a book search engine

WHEN I load the search engine
THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button

WHEN I click on the Search for Books menu option
THEN I am presented with an input field to search for books and a submit button

WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site

WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up

WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button

WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button

WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site

WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site

WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout

WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account

WHEN I click on the Save button on a book
THEN that book’s information is saved to my account

WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account

WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list

WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Screenshots


Screeshot of search results for Javascript
<div align="center">

![Screeshot of search results for Javascript](./client/public/assets/images/screenshot1.png)
</div>

Screenshot of books saved by a User
<div align="center">

![Screenshot of books saved by a User](./client/public/assets/images/screenshot2.png)
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

My portfolio is a deployed application available via this link: [Hybee's Google Book Search Engine (MERN)](https://hybee-book-search-engine-e306e54d030c.herokuapp.com/)

The below installations steps are only required if you want to run a local copy or contribute to its design (Skip to usage if you just want to make use of the application)

1. Clone or fork the repository
2. Run the below in console install necessary packages    
    
```
npm i
```
3. Once installed you can start the client server services with the below command in the CLI:
```
npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

My portfolio is a deployed application available via this link: [Hybee's Google Book Search Engine (MERN)](https://hybee-book-search-engine-e306e54d030c.herokuapp.com/)

When launched, this application will present with a search field. You can search for books (utilising Google) without logging in, however it is recommended to sign up so that you can save books of interest against your accoun. You can view and delete saved books in the "See Your Books" screen.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
    
## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This application can be used in conjunction with licensing covered in  <b>MIT Lcensee</b>

(Click on the badge for details of the license)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

To contribute to this application, please reach out to me via my contact details below

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Testing

Automated Test scripts have not been developed for this application

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Questions

- Visit my GitHub page: <a href="https://github.com/hybee234"> hybee234 </a>
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

