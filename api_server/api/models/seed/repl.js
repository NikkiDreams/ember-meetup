'use strict';
import repl from 'repl';
import mongoose from 'mongoose';


// require all models in the 'models' directory
require('../all-models').toContext(global);

let shell = repl.start({
  prompt: 'mongoose> ',
  input: process.stdin,
  output: process.stdout,
  useColors: true,
});
