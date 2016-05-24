'use strict';
import fs from 'fs';
//require all the models
let models = {};
let names = fs.readdirSync('/');

names.forEach(name => {
  if (!name.match(/\.js$/)) {
    return;
  }
  if (name === 'connection-string.js' || name === 'all-models.js'){
    return;
  }
  let model = require('./' + name);
  models[model.modelName] = model;
});

// define non-enumerable method to place each model onto an object. primarily for making them global
Object.defineProperty(models.__proto__, 'toContext', {
  enumerable: false,
  value: (context) => {
    for (let name in this) {
      context[name] = this[name];
    }
    return context;
  }
});


export defalt models;
