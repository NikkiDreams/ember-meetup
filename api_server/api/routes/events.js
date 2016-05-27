'use strict'
import express from 'express';
import numeral from 'numeral';
import mongoose from 'mongoose';
import JSONAPIDeserializer from 'jsonapi-serializer/lib/deserializer';
import JSONAPISerializer from 'jsonapi-serializer/lib/serializer';
import app from '../../app';

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
const debug = require('debug')('ember-meetup');
const	models = {
    Event: _Models['Event'],
		Comment: _Models['Comment'],
		Creator: _Models['Creator'],
		EventDate: _Models['EventDate'],
		User: _Models['User'],
		Vote: _Models['Vote']
    //Creator: require('./models/school')(OrganizationModel, OrganizationSchema)
 };

const JSONAPI_OPTIONS_SERIALIZE = {
	ref: null,
	included: true,
	attributes: ['location', 'title' ,'description'],
	topLevelLinks: '', // () => {}
	dataLinks: '', // () => {}
	relationshipLinks: {}, // () => {}
	relationshipMeta: '', // () => {}
	ignoreRelationshipData: false,
	keyForAttribute: 'camelCase', // () => {}
	pluralizeType: true,
	typeForAttribute(){ return; },
	meta: {name:'non-standard-meta-info'}
}
const _JSONresponse = new JSONAPISerializer('events', JSONAPI_OPTIONS_SERIALIZE);

const JSONAPI_OPTIONS_DESERIALIZE
 = {
		keyForAttribute: 'dash-case', // () => {}
		AN_ATTRIBUTE_TYPE: {}
}
const _JSONrequest = new JSONAPIDeserializer('event', JSONAPI_OPTIONS_DESERIALIZE);

const _JSONAPIify = (req, res) => {
	   if (req.body.data){
		       let event = _JSONresponse.serialize(req.body.data);
		       //delete event['__private'];
		       res.status(200).json(event).end();
   	}
		 else {
		       res.status(204).end();
	   }
}

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


/** GET /health-check - Check service health */
router.get('/event-health', (req, res) => {
	res.status(200).json({ message:'OK' });
});

router.post('/', controller.create, _JSONAPIify);
router.get('/list', controller.list, _JSONAPIify);

router.get('/:id', controller.show, _JSONAPIify);
router.put('/:id', controller.update, _JSONAPIify);
router.delete('/:id', controller.delete, _JSONAPIify);

router.delete('/:id/code/:code', controller.delete, _JSONAPIify);
router.get('/:id/code/:code', controller.verifyEmail, _JSONAPIify);

router.post('/:id/comment', controller.createComment, _JSONAPIify);
router.delete('/:id/comment/:cid', controller.deleteComment, _JSONAPIify);

router.post('/:id/participant', controller.createParticipant, _JSONAPIify);
router.delete('/:id/participant/:pid', controller.deleteParticipant, _JSONAPIify);
router.put('/:id/participant/:pid', controller.updateParticipant, _JSONAPIify);


export default router;
