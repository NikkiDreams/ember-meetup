'use strict';
import util from 'util';
import {EventEmitter} from 'events';

function Communicator(){
    EventEmitter.call(this);
}

util.inherits(Communicator, EventEmitter);

export default new Communicator();
