# Ember-meetup (WIP)

## Collaborative Scheduling for Ember.
Ember-Meetup is a collaborative scheduling solution similar to Dribble and other scheduling applications. EM is 2 application in one; A front-end Ember application that can be used as is or customized to your API and an API server. EM can be used as a standalone solution or you can use just the front-end on it's own or embedded into another Ember application.

Based on Rallly https://github.com/lukevella/Rallly
I am migrating the original application to Ember from Angular and modernizing source and libraries. I plan to add Hour Range selection in the future. But for now the goal to to duplicate existing functionality and improve upon it. On of my main reasons for this project is that I need it for my startup and I think the Ember community could really benefit from this. Having an embeddible solution as apposed to a separate "APP" has many advantages. Another immediate advantage to using Ember is that it is DB agnostic and more flexible/scalable. Rallly is a great little app in it's own right, kudos to  Luke for creating the original version.
    Cheers!
    Nix

## Architecture
### Front-End application
* Ember 2.5+

### API Server
* Express 4.X +
* MongoDB / Mongoose
* JSONApi
* Node 4.X +
* Babel 6.X


## Contributing
Please feel free to contribute to the completion of this project. Standard Open Source protocols apply. I am aiming for completion of Phase 1 by June.

## Migration Status as of 05/26/2016
* API and Models completely rewritten (Mongoose Generator)
* All modules and addons updated
* ES6ified most of API service (Babel-Node)
* changed out DateJS for Moment
* New Schedule page completely
* Converting API to JSONApi.org standard
* Fixed standalone Application and service integration (Express 4)
* Added Modal support

## Migration Status as of 04/19/2016
* Ember App created with all existing code
* Date/Calendar form converted to use Moment
* Calendar Pagination
* Select Dates
* Display Selected Dates in left Column
* Compound Scope Obj migrated to Enumerable and separate properties
* Converted Mongoose Model to Ember Model

## TODO
* All form Fields need properties
* Convert remaining Angular ng- code to Ember actions and helpers
* Complete JSONApi conversion in API server
* Server side verification
* Edit Schedule
* Mocha Tests
* Configure Winston
* Tune API for standalone Production usage
* Create sample data import
* Documentation
* Notifications/Communicator CLASS helpers for Email service
* Confirm Modals
* Serializer for Example API
* Accounts
* More...

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`
* Until the API is pulled in you will need to run Rallly in the background.

## Running / Development

* `NODE_ENV=development; npm start;`
* `ember serve` for Ember dev only
* `NODE_ENV=development; DEBUG=ember-meetup:* babel-node ./api_server/app.js` for API server
* Visit your app at [http://localhost:4200](http://localhost:4200)
* Visit your app at [http://localhost:3000](http://localhost:3000) for API Service

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
