'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const port = process.env.PORT || 3000;
const server = require('../server');
const serverUrl = `http://localhost:${port}`;

describe ('testing for storage-integration', function(){
  before(function(done){
    if(!server.isRunning){
      server.listen(port, function(){
        server.isRunning = true;
        done();
      });
      return;
    }
    done();
  });

  after(function(done){
    if(server.isRunning){
      server.close(function(){
        server.isRunning = false;
        console.log('shutdown the server');
        done();
      });
      return;
    }
    done();
  });
  //test POST
  describe('testing /api/note POST method', function(){
    let testNote = {};
    before((done) => {
      request
        .post(`${serverUrl}/api/note`)
        .send({content: 'testnote!', id: '123456'})
        .end((err, res) => {
          if (err) return (err);
          testNote = res;
          done();
        });
    });

    it('should return status 200', (done) => {
      expect(testNote.status).to.equal(200);
      done();
    });
    it('should return a note', (done) => {
      expect(testNote.body.content).to.equal('testnote!');
      done();
    });
  });
  //test GET
  //FIX IT!!!
  describe('testing /api/note GET method', function(){
    it('should return status: 200', (done)=> {
      request
      .get(`http://localhost:${port}/api/note`)
      .query('content=testnote!')
      .end((err, res) =>{
        expect(res.status).to.eql(200);
        done();
      });
    });
  });

//test DELETE
  describe('testing /api/note DELETE method', function(){
    it('should return atatus 200', (done) =>{
      request
      .del(`http://localhost:${port}/api/note?id=testnote!`)
      .send({id:'123456'})
      .end((err, res) =>{
        expect(res.status).to.eql(200);
        done();
      });
    });
  });
});
