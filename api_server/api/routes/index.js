'use strict';
import express from 'express';
import app from '../../app';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json('index', {
      data: {
        title: 'Ember-Meetup API Server',
        description: 'Ember-Meetup API Server is a standalone JSONApi Service \
        		to support Ember-Meetup as a standalone application. However, Ember-Meetup \
         	  is designed to be used as an Embedded Ember Application or Service.',
        date: new Date()
      },
      status: 200
  });
});

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => {
  res.status(200).json({
    data:{
      message:'OK',
      status: 200
    }
  });
});

export default router;
