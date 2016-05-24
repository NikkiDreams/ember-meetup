'use strict';
import config from '../../config';

let showErrors = config.get('errors.showStack');

function errorHandler(err, req, res, next){
  if (err.status) res.statusCode = err.status;
  if (res.statusCode < 400) res.statusCode = 500;
  req.headers = req.headers || {};
  let accept = req.headers.accept || '';
  // json
  if (~accept.indexOf('json')) {
    let error = { message: err.message};
    if(showErrors) error.stack = err.stack;
    for (let prop in err) error[prop] = err[prop];
    let json = JSON.stringify({ error: error });
    res.setHeader('Content-Type', 'application/json');
    res.end(json);
  // plain text
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.end(err.message);
  }
};

export default errorHandler;
