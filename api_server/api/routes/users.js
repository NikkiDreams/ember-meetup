'use strict';
import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({data:{message:"Nobody Home",status:204}});
});

router.get('/:id', function(req, res, next) {
  res.json({data:{message:"Nobody Home",status:204}});
});


export default router;
