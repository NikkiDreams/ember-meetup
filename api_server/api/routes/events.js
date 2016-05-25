'use strict'
import express from 'express';
import numeral from 'numeral';
import mongoose from 'mongoose';
import API from 'json-api';

/* Import all Event Models */
import _Models from '../models/all-models';
/*
import _Event from '../models/Event';
import _Comment from '../models/Comment';
import _Creator from '../models/Creator';
import _EventDate from '../models/EventDate';
import _User from '../models/Participant';
import _Vote from '../models/Vote';
*/

/* Import Event Controller */
import controller from '../controllers/EventController';

const router = express.Router();	// eslint-disable-line new-cap
const APIError = API.types.Error;
const debug = require('debug')('ember-meetup');

router.get('/count', (req,res) => {
		Event.count({}, (err, count) => {
			let status = 200;
				if (err){
					status = 500;
				}
				res.status(status).json({
					data:{
						message: 'Count '+numeral(count).format('0,0')+' Events',
						count: numeral(count).format('0,0')
					}
				}).end();
		});
});

/*
let EventModelSchema = _Models['Event'],
		EventModel       = EventModelSchema.model,
  	EventSchema      = EventModelSchema.schema;
*/

let	models = {
    Event: _Models['Event'],
		Comment: _Models['Comment'],
		Creator: _Models['Creator'],
		EventDate: _Models['EventDate'],
		User: _Models['User'],
		Vote: _Models['Vote']
    //Creator: require('./models/school')(OrganizationModel, OrganizationSchema)
 }

let adapter = new API.dbAdapters.Mongoose(models);
let registry = new API.ResourceTypeRegistry({
    "events": {
      urlTemplates: {
				self: "http://localhost:3000/docs/events/",
    		relationship: "http://127.0.0.1:3000/api/events/{ownerId}/relationships/{path}"
      }
    }
  }, {
    "dbAdapter": adapter
});

// Set up API controllers
let APIController = new API.controllers.API(registry);
// Initialize the automatic documentation.
let DocsController = new API.controllers.Documentation(registry, {name: 'event'});
let Front = new API.httpStrategies.Express(APIController, DocsController);
let apiReqHandler = Front.apiRequest.bind(Front);


let after = (req, res) => {
    if (req.event){
        let event = req.event.toObject();
        delete event['__private'];
        res.status(200).json(event).end();
    } else {
        res.status(204).end();
    }
}


/** GET /health-check - Check service health */
router.get('/event-health', (req, res) => {
	res.status(200).json({ message:'OK' });
});

router.get("/docs", Front.docsRequest.bind(Front));


router.post('/', controller.create, after)
  .post(apiReqHandler);

router.get('/list', controller.list, after)
  .post(apiReqHandler);

router.get('/:id', controller.show, after)
  .get(apiReqHandler);
router.put('/:id', controller.update, after)
  .put(apiReqHandler);
router.delete('/:id', controller.delete, after)
  .delete(apiReqHandler);

router.delete('/:id/code/:code', controller.delete, after)
  .delete(apiReqHandler)
router.get('/:id/code/:code', controller.verifyEmail, after)
  .get(apiReqHandler);

router.post('/:id/comment', controller.createComment, after)
  .post(apiReqHandler);
router.delete('/:id/comment/:cid', controller.deleteComment, after)
  .delete(apiReqHandler);

router.post('/:id/participant', controller.createParticipant, after)
  .post(apiReqHandler);
router.delete('/:id/participant/:pid', controller.deleteParticipant, after)
  .delete(apiReqHandler);
router.put('/:id/participant/:pid', controller.updateParticipant, after)
  .put(apiReqHandler);

router.use(function(req, res, next) {
	Front.sendError(new APIError(404, undefined, 'Event Rout Not Found'), req, res);
});


export default router;
