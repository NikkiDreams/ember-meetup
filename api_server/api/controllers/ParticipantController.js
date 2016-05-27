'use strict';
import express from 'express';
import mongoose from 'mongoose';
import logger from '../../config/winston';
import {Serializer,Deserializer} from 'jsonapi-serializer';
import app from '../../app';
import Event from '../models/Participant.js';
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
		keyForAttribute: 'dash-case' // () => {}
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

/*
function GET(req, res, next){
  if(!req.swagger.params.id){
    res.set('Content-Type', 'application/json');
    Participant.find(req.swagger.params).stream().pipe(JSONStream.stringify()).pipe(res);
  }else{
    Participant.findOne(req.params, function findOneCb(err, doc){
      if(err){
        next(err);
      }else if(doc){
        res.status(200).json(doc);
      }else{
        next();
      }
    });
  }
}

function POST(req, res, next){
  let M = Participant;
  let doc = new M(req.body);
  doc.save(function saveCb(err){
    if(err){
      next(err);
    }else{
      res.status(201).json(doc);
    }
  });
}

function PUT(req, res, next){
  Participant.update(req.swagger.params, req.body, function updateCb(err){
    if(err){
      next(err);
    }else{
      res.status(200).json(req.body);
    }
  });
}

function DEL(req, res, next){
  Participant.remove(req.params, function removeCb(err){
    if(err){
      next(err);
    }else{
      res.status(200).json();
    }
  });
}
export default {
  GET: GET,
  POST: POST,
  PUT: PUT,
  DEL: DEL
};

*/
