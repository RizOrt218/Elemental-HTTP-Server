'use strict'

const http          = require( 'http' );
const fs            = require( 'fs' );
const url           = require( 'url' );
const querystring   = require( 'querystring' );
const getFile       = require( './method/GET' );
const postFile       = require( './method/POST' );
const putFile       = require( './method/PUT' );
const deleteFile       = require( './method/DELETE' );

var server = http.createServer( ( request, respond ) => {
  request.setEncoding( 'utf-8' );

  let body = null;

  request.on('data', (reqBody) => {
    body = reqBody;
    console.log( body );
  });

  switch (request.method) {
    case 'GET':
      return getFile.GET(req, res);
    case 'POST':
      return req.url !== '/elements' ? postFile.ERROR(null, req, res) : postFile.POST(req, res, postFile.ERROR);
    case 'PUT':
      return putFile.PUT(req, res);
    case 'DELETE':
      return deleteFile.DELETE(req, res);
    default:
      return methodFile.ERROR(req, res);
  }

});

server.listen( { port: 8212 }, function() {
  console.log( 'server started http://localhost:8212' );
});