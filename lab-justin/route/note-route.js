'use strict';

const Note = require('../model/note');
const response = require('../lib/response');

var notePool = {};

module.exports = function(router){

  router.post('/api/note', function(req, res){
    if (req.body){
      const note = new Note(req.body.content);
      notePool[note.id] = note;
      return response(200, note)(res);
    }
    response(400, 'bad request')(res);
  });

  router.get('/api/note', function(req, res){
    const note = notePool[req.url.query.id];

    if (note){
      return response(200, note)(res);
    }
    response(404 , 'not found')(res);
  });

  router.delete('/api/note', function(req, res){
    const note = notePool[req.url.query.id];

    if (note){
      delete notePool[note.id];
      return response(200, 'Mission: Del - accomplished!');
    }
    response(404, 'not found')(res);
  });
//
  router.get('/api/note/all', function(req, res){
    const idArray = [];

    if(Object.keys(notePool).length === 0) {
      return response(404, 'not found')(res);
    }

    for (var id in notePool) {
      idArray.push(id);
    }
  });
//
};
