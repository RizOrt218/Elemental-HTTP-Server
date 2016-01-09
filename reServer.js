'use strict'

const http          = require( 'http' );
const fs            = require( 'fs' );
const url           = require( 'url' );
const querystring   = require( 'querystring' );

var server = http.createServer( connectServer );

function connectServer ( request, respond ) => {
  request.setEncoding( 'utf-8' );

  let body = null;

  request.on('data', (reqBody) => {
    body = reqBody;
    console.log( body );
  });



}

server.listen( { port: 2180 }, function() {
  address = server.address();
  console.log( "opened server on %j", address );
});