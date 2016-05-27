'use strict';
import express from 'express';
import mongoose from 'mongoose';
import JSONAPIDeserializer from 'jsonapi-serializer/lib/deserializer';
import JSONAPISerializer from 'jsonapi-serializer/lib/serializer';
import logger from '../../config/winston';
import app from '../../app';
//import Event from '../models/Participant.js';
import communicator from '../../middleware/communicator';

const debug = require('debug')('ember-meetup');
const ObjectId = mongoose.Types.ObjectId;
const getRandomString = ()=>{
    return require('crypto').randomBytes(16).toString('hex');
}

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

const JSONAPI_OPTIONS_DESERIALIZE = {
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
