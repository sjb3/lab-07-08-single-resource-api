'use strict';

const uuid = require('node-uuid');

module.exports = function Note(content){
  this.id = uuid.v1();
  this.content = content;
  this.mathRandom = Math.floor(Math.random()*100);
  this.timestamp = new Date();
};
