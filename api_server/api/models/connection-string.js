'use strict';
// place connection string here
// e.g. let uri = 'mongodb://andy:corn@ds051334.mongolab.com:51334/cli';
// or   let uri = 'mongodb://andy:corn@localhost:27017/cli';
// or   let uri = config.get('mongo');
let uri = 'mongodb://me:me@localhost:27017/sched1';
if (!uri){
  throw new Error('You need to provide the connection string. You can open "models/connection-string.js" and export it or use the "setUri" command.');
}
else {
  let cmd = uri.match(/^mongodb:\/\/(\w+):(.*?)@(.*?):(\d+)\/(\w+)$/);
  console.log('xxxxx',cmd);
  if (!cmd) {
    throw new Error('Improperly formatted URI: ' + uri);
  }
}
export default uri;
