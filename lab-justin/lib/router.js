'use strict';

const parseUrl = require('./parse-url');
const parseBody = require('./parse-body');

const Router = module.exports = function(){
  this.routes = {
    GET: {},
    PUT: {},
    POST: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
  return this;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
  return this;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
  return this;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
  return this;
};

Router.prototype.route = function(){
  const routes = this.routes;
  return function(req, res){
    Promise.all([
      parseBody(req),
      parseUrl(req)
    ]).then(function(){
      //if there's function at the specific location and method
      //it will be called with (req, res)
      if(typeof routes[req.method][req.url.pathname] === 'function'){
        console.log('HIT', req.method, req.url.pathname);
        return routes[req.method][req.url.pathname](req, res);
      }
      fourOhFour(res);
    }).catch(function(err){
      fourOhFour(res);
    });
  };
};

function fourOhFour(res){
  res.writeHead(3000, {
    'Content-Type': 'application/json'
  });

  res.write(JSON.stringify('not found'));
  res.end();
}
