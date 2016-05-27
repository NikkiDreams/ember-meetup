'use strict';
import express from 'express';
import mongoose from 'mongoose';
import JSONAPIDeserializer from 'jsonapi-serializer/lib/deserializer';
import JSONAPISerializer from 'jsonapi-serializer/lib/serializer';
import logger from '../../config/winston';
import app from '../../app';
import Event from '../models/Event.js';
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

exports.verifyEmail = (req, res, next) => {
    let id = req.params.id,
        code = req.params.code;

    Event
        .update({
                '_id' : id,
                'verificationCode' : code
            }, {
                'creator.isVerified' : true ,
                'verificationCode' : getRandomString()
            })
        .exec((err, num)=>{
            if (err){
              return handleError(res, err);
            }
            if (num == 0){
              return res.status(498).end();
            }
            next();
        });
}

exports.create = (req, res, next) => {
    let event = _JSONrequest.deserialize(req.body.data);

    event.verificationCode = getRandomString();
    event.unsubscribeCode = getRandomString();

    console.log("NEW EVENT---", event);

    return Event
        .create(event, function(err, event){
            if (err){
              logger.debug("something went terribly wrong: ", err)
              return handleError(res, err);
            }
            if (!event){
              return res.status(404);
            }
            communicator.emit('event:create', event);
            req.event = event;
            next();
        });
}

exports.show = (req, res, next) => {
  let _id = ObjectId.isValid(req.params.id) ? req.params.id : ObjectId.fromString( _id );
  if (_id){
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    console.log("GOOD ID",req.params, _id);
  }
  else{
    console.log("BADD ID-1",req.params, _id);
  }
  Event
      .findById(_id)
      .exec((err, event)=>{
          if (err){
            return handleError(res, err);
          }
          if (!event){
            return res.status(404).json({message:"Event "+_id+" not Found"}).end();
          }
          req.event = event;
          next();
      });
}

exports.list = (req, res, next) => {
  Event
      .find({})
      .populate('eventDate')
      .populate('creator')
      .populate('comment')
      .populate('participant')
      .exec((err, event)=>{
          if (err){
            return handleError(res, err);
          }
          if (!event){
            return res.status(404).json({message:"No Events Found"}).end();
          }
          //req.event = event;
          return res.status(200).json({data:event}).end();
          next();
      });
}

exports.update = (req, res) => {
    let updatedEvent = req.body;
    updatedEvent.updated = Date.now();
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
      console.log("GOOD ID",req.params);
    }
    else{
      console.log("BADD ID-2",req.params);
    }

    Event
        .findById(req.params.id)
        .exec((err, event)=>{
            if (err) return handleError(res, err);
            if (!event) return res.status(404).end();
            // If the creator's email has changed OR the notifications setting has changed - start a new email confirmation transaction
            if (event.creator.email != updatedEvent.creator.email ||
                (!event.creator.allowNotifications && updatedEvent.creator.allowNotifications)) {
                    updatedEvent.creator.isVerified = false;
                    updatedEvent.creator.allowNotifications = true;
                    updatedEvent.__private = event.__private;
                    communicator.emit('event:update:creator.email', updatedEvent, event);
            }

            Event
                .update({ '_id' : req.params.id }, updatedEvent)
                .exec(()=>{
                    communicator.emit('event:update', updatedEvent, event);
                    return res.status(204).end();
                });
        });
}

exports.delete = (req, res, next) => {
    let eventId = req.params.id
    Event
        .update({
            '_id' : eventId
        }, {
            'isDeleted' : true
        })
        .exec((err, num)=>{
            if (err){
              return handleError(res, err);
            }
            if (num == 0){
              return res.status(498).end();
            }
            next();
        });
}

exports.createComment = (req, res, next) => {
    let eventId = req.params.id,
        comment = req.body;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
      console.log("GOOD ID",req.params);
    }
    else{
      console.log("BADD ID-3",req.params);
    }

    Event
        .findById(eventId)
        .exec((err, event)=>{
            if (err) return handleError(res, err);
            event.comments.push(comment);
            event.save((err, event)=>{
                if (err) {
                  return next(err);
                }
                communicator.emit('comment:add', event, comment);
                req.event = event;
                next();
            });
        });
}

exports.deleteComment = (req, res, next) => {
    let eventId = req.params.id,
        commentId = req.params.cid;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
          console.log("GOOD ID",req.params);
        }
        else{
          console.log("BADD ID-4",req.params);
        }
    Event
        .findById(eventId)
        .exec((err, event)=>{
            if (err){
              return handleError(res, err);
            }
            event.comments.pull({ '_id' : commentId });
            event.save((err, event)=>{
                req.event = event;
                next();
            })
        });
}


exports.createParticipant = (req, res, next) => {
    let eventId = req.params.id,
        participant = req.body;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
          console.log("GOOD ID",req.params);
        }
        else{
          console.log("BADD ID-5",req.params);
        }
    Event
        .findById(eventId)
        .exec((err, event)=>{
            if (err) return handleError(res, err);
            event.updated = Date.now();
            event.participants.push(participant);
            event.save(function(err, event){
                if (err) {
                  return next(err);
                }
                communicator.emit('participant:add', event, participant);
                req.event = event;
                next();
        });
    });
}

exports.updateParticipant = (req, res, next) => {
    let eventId = req.params.id,
        participantId = req.params.pid;

    Event
        .update({
            '_id' : eventId,
            'participants._id': participantId
        }, {
            '$set': {
                'updated' : Date.now(),
                'participants.$' : req.body
            }
        })
        .exec((err, num)=>{
            if (err){ return
              handleError(res, err);
            }
            res.status(204).end();
        });
}

exports.deleteParticipant = (req, res, next) => {
    let eventId = req.params.id,
        participantId = req.params.pid;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
          console.log("GOOD ID",req.params);
        }
        else{
          console.log("BADD ID-6",req.params);
        }
    Event
        .findById(eventId)
        .exec(function(err, event){
            if (err){
              return handleError(res, err);
            }
            event.updated = Date.now();
            event.participants.pull({ '_id' : participantId });
            event.save((err, event)=>{
                req.event = event;
                next();
            })
        });
}


function handleError(res, err) {
    logger.log("ERROR: " + err);
    return res.status(500).json({ data:{ message:err }});
}
