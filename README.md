<a ID="readme-top"></a>

<div align="center">

# Ganbarou! 
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
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Project 3 - MERN Stack

</div>

## Description

Ganbarou is a task management and prioritisation solution designed for a team of users with needing to balance demands from operational and business demands. 

Ganbarou sets itself apart from other task management solutions by making use of a "review date" for each task and in the way tasks are classified and prioritised.

High level features of the application are:
* Task tracking across team members (add, complete, update tasks)
* Assisting the user with focusing on tasks that require attention
* Grouping tasks into task types (Operational and Business Driven) to organise and prioritise work
* Processes to prioritise business driven initiatives into a pipeline of works.
* Transparency of task status across the team for more efficient and effective management.
* Responsive design that is mobile-friendly
* Stripe integration enabling "buy me a coffee" donations

Ganbarou is built on the MERN technology stack (Utilising React Context API) and is deployed on Heroku. Concepts of gamification and 

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
AS a member of a team in high demand

I WANT to be able to manage by tasks effectively and be clear on what my priorities are 
SO THAT I can remain effective and efficient


As manager of a team in high demand

I WANT to have transparency of all team tasks 
SO THAT I can effectively manage the team AND collaborate with the business stakeholders to organsie pipelines of work
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## User Acceptance Criteria

### This application was developed with the below User acceptance criteria:

```
GIVEN a task management solution

WHEN I load task management solution
THEN I am presented with a welcome screen with options to Login or Sign up to the application

WHEN I log in or sign up
THEN I am presented with my list of tasks assigned to me. Tasks are grouped into 3 categories - Operational, Focus, and Opportunistic. At the top of the screen is a summary of tasks and their status, followed by detailed lists of tasks for each type (Namely, operational, focus, opportunistic)

WHEN reviewing operational tasks on my tasklist
THEN I am presented with columns relevant to Operational tasks (Prioritisation columns are hidden)

WHEN reviewing business driven tasks on my tasklist (Focus and Opportunistic)
THEN I am presented with columns relevant to Business Driven request which includes prioritisation columns (Urgent/Important/Effort, Category and Pipieline)

WHEN the review date on tasklists
THEN tasks are shaded red if the date has elapsed to highlight their need for attention, tasklists (except business driven) are sorted in ascending order of review date to keep oldest review date on top. 

WHEN changing the review date
THEN tasks on the tasklist will sort itself by review date, the application will determine if a red shaded background is required and the task summary icon at the top of the page will also update to reflect status

WHEN interacting with tasklists
THEN I am able to change review date, assigned team member and pipeline number directly on the table. Clicking on the Title will open to the detail screen of the task. 

WHEN reassigning tasks
THEN the task will move to the relevant user's tasklist

WHEN I hover my mouse over various parts of the tasklist and task detail form (or long-tap on a phone/tablet)
THEN tooltips will display where relevant

WHEN I adjust the size of my screen or move onto table/phone devices
THEN Ganbarou will dynamically respond to suit use on different sized screens

WHEN a user donates a cup of coffee
THEN Ganbarou will direc the user to a payment screen to complete the transaction



```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Screenshots


Screeshot of "My Tasks" screen featuring the Task Summary banner and the task lists for Operational and Focus tasks
<div align="center">

![Screeshot of "My Tasks" screen featuring the Task Summary banner and the task lists for Operational and Focus tasks](./client/public/assets/images/screenshot1.png)
</div>

Screenshot of the Task Details form
<div align="center">

![Screenshot of the Task Details form](./client/public/assets/images/screenshot2.png)
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

Ganbarou is a deployed application available via this link: [Ganbarou](https://ganbarou-1225f2f4e197.herokuapp.com/)

The below installations steps are only required if you want to run a local copy or contribute to its design (Skip to usage if you just want to make use of the application)

1. Clone or fork the repository
2. Run the below in console install necessary packages    
    
```
npm i
```
3. Once installed you can start the client and server services with the below command in the CLI:
```
npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Ganbarou is a deployed application available via this link: [Ganbarou](https://ganbarou-1225f2f4e197.herokuapp.com/)

When launched, you'll first be presented with a welcome screen which allows you the option to login or sign up. Step through this process and you'll be brought into the main tasklist screen to start adding tasks and managing them!

### To make the most of Ganbarou:

### Prioritisation:

Ganbarou encourages you to firstly think of your work as either Operational or Business Driven.
* Operational work is required to keep the lights on - typically work originating within the team itself. These are tasks which must be done to ensure ongoing function of the team
* Business driven request originate from outside of the team,

Next, Ganbaroubreaks business requests down to "Focus" and "Opportunistic" requests. In the context of Business driven requests:
* Focus initiatives take priority over Opportunistic (Focies initiatives are typically larger, strategic pieces (high value/high effort) that require dedication to move forward).
* Focus initiatives are agreed upon tasks that require regular feedback and update
* Opportunistic initiatives are smaller initiatives that can be picked up/dropped as needed - typically quick wins, nice to haves
* Opportunistic initiatives do not have a delivery date, they can only be worked on when actions against operational and focus items are not sitting with the team.

Once tasks have been organised into their relevant types, then prioritisation of business driven requests can also take place in their relevant bundle - one pipeline for focus and one for opportunistic (Note that operational tasks are exempt from prioritisation - they always come first)
* The team is encouraged to screen requests and categorise first before bringing it to a committee to agree and authorise the pipeline of works (Focus and Opportunistic )

### Review Date:
* Ganbarou makes use of a Review Date on each task for users to determine when the task requires attention.
* An elapsed review date will turn the background of the task red (as well as a few other areas - the task summary banner, and the task type and review date on the task detail screen)
* All tasklists (except for the business driven tasklist) are sorted by review date with the oldest date on top, this creates a to-do list for the user to work from top to bottom.
* The user should continue to update the review date as each action is complete to determine when they want to next work on the task (e.g. if the action is sitting outside the team then the review date should reflect when they want to follow up on the action)



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

