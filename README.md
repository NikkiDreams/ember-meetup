# Ember-meetup

## Collaborative Scheduling for Ember.
Based on Rallly https://github.com/lukevella/Rallly
I am migrating the original application to Ember from Angular and modernizing source and libraries. I plan to add Hour Range selection in the future. But for now the goal to to duplicate existing functionallity and improve upong it. On of my main reasons for this project is that I need it for my startup and I think the Ember community could really benefit from this. Having an embeddible solution as apposed to a seperate "APP" has many advantages. Another immediate advantage to using Ember is that it is DB agnotic and more flexible/scalable. Rallly is a great little app in it's own right, kudos to  Luke for creating the original version. However I am not an Angular fan nor do I wish to add yet another technology to my existing Ember/Sails architecture. So now you know :-)
Cheers!

## Contributing
Please feel free to contribute to the completion of this project. Standard Open Source protocols apply. I am aiming for completion of Phase 1 by May.

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Migration Status as of 04/19/2016
* Ember App created with all existing code
* Date/Calendar form converted to use Moment
* Calendar Pagination
* Select Dates
* Display Selected Dates in left Column
* Compund Scope Obj migrated to Enummerables and seperate properties
* Converted Mongoose Model to Ember Model 

## TODO
* All form Fields need properties
* E6 legacy code
* Convert remaining Angular ng- code to Ember actions and helpers
* Save Scheduale to API
* Edit Schecdule
* Fold simple Express API into project example
* Documentation
* Notifications
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
* Until the API is pulled in you will need to run Rallley in the background.

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

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
