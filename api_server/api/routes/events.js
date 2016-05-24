'use strict'
import express from 'express';
import numeral from 'numeral';
import mongoose from 'mongoose';
import API from 'json-api';

/* Import all Event Models */
import Event from '../models/Event.js';
import Comment from '../models/Comment.js';
import Creator from '../models/Creator.js';
import EventDate from '../models/EventDate.js';
import User from '../models/Participant.js';
import Vote from '../models/Vote.js';

/* Import Event Controller */
import controller from '../controllers/EventController';

const router = express.Router();	// eslint-disable-line new-cap
const APIError = API.types.Error;
const debug = require('debug')('ember-meetup');

router.get('count', (req,res) => {
		Event.count({}, (err, count) => {
				if (err) res.status(500);
				res.json({
					data:{
						message: 'Count '+numeral(count).format('0,0')+' Events',
						count: numeral(count).format('0,0'),
						status: 200
					}
				});
		});
});

let adapter = new API.dbAdapters.Mongoose(Event);
let registry = new API.ResourceTypeRegistry({
    "Event": {
      urlTemplates: {
        "self": "/event/{id}"
      },
      beforeRender: (resource, req, res)  => {
        //if(!userIsAdmin(req)) resource.removeAttr("password");
        return resource;
      }
    }
  }, {
    "dbAdapter": adapter
});


// Set up API controllers
let APIController = new API.controllers.API(registry);
// Initialize the automatic documentation.
//let DocsController = API.controllers.Documentation(registry, {name: 'Event API'}, '../../mvc-app/templates/documentation.hbs');
let Front = new API.httpStrategies.Express(APIController);
let apiReqHandler = Front.apiRequest.bind(Front);

let after = (req, res) => {
    if (req.event){
        let event = req.event.toObject();
        delete event['__private'];
        res.json(event);
    } else {
        res.status(204).end();
    }
}

/** GET /health-check - Check service health */
router.get('event-health', (req, res) => {
	res.json({ message:'OK', status: 200});
});

router.get('all', controller.create, after)
  .post(apiReqHandler);

router.post('add', controller.create, after)
  .post(apiReqHandler);
router.get(':id(event)', controller.show, after)
  .get(apiReqHandler);
router.put(':id(event)', controller.update, after)
  .put(apiReqHandler);
router.delete(':id(event)', controller.delete, after)
  .delete(apiReqHandler);
router.delete(':id/code/:code(event)', controller.delete, after)
  .delete(apiReqHandler)
router.get(':id/code/:code(event)', controller.verifyEmail, after)
  .get(apiReqHandler);

router.post(':id/comment(event)', controller.createComment, after)
  .post(apiReqHandler);
router.delete(':id/comment/:cid(event)', controller.deleteComment, after)
  .delete(apiReqHandler);

router.post(':id/participant(event)', controller.createParticipant, after)
  .post(apiReqHandler);
router.delete(':id/participant/:pid(event)', controller.deleteParticipant, after)
  .delete(apiReqHandler);
router.put(':id/participant/:pid(event)', controller.updateParticipant, after)
  .put(apiReqHandler);

router.use(function(req, res, next) {
	Front.sendError(new APIError(404, undefined, 'Event Rout Not Found'), req, res);
});


export default router;
