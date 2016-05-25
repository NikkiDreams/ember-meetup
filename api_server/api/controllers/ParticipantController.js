'use strict';
import JSONStream from 'JSONStream';
import Participant from '../models/participant';

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
