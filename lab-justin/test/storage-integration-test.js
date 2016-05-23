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
        done();
      });
      return;
    }
    done();
  });
  after(function(done){
    if(server.isRunning){
      server.close(function(){
        server.close(function(){
          server.isRunning = false;
          done();
        });
        return;
      });
      return;
    }
    done();
  });
  describe('testing /api/note GET method', function(){
    before((done) => {
      console.log('BEFORE REQUEST: ', `${serverUrl}/api/note`);
      request.post(`${serverUrl}/api/note`)
      .send({content: 'test note !!!'})
        .end((err, res) => {
          if (err) console.log('ERR: ', err);
          request.get(`${serverUrl}/api/note?id=${res.body.id}`)
          .end((err, res) => {
            if (err) console.log('ERR: ', err);
            this.res = res;
            done();
          });
        });
    });
    it('should return status 200', () => {
      expect(this.res.status).to.equal(200);
    });
    it('should return a note', () => {
      // throw new Error(this.res.body);
      console.log('THIS IS IT: ', this.res.body);
      expect(this.res.body.content).to.equal('test note !!!');

    });
  });
});
