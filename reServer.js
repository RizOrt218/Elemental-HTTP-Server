'use strict'

const http          = require( 'http' );
const querystring   = require( 'querystring' );
const getFile       = require( './method/GET' );
const postFile      = require( './method/POST' );
const putFile       = require( './method/PUT' );
const deleteFile    = require( './method/DELETE' );

var server = http.createServer( ( request, respond ) => {
  request.setEncoding( 'utf-8' );

  //reads request method and invokes fn
  switch (request.method) {

    case 'GET':
      getFile( request, respond );
      break;
    case 'POST':
      console.log( 'this working?');
      postFile( request, respond );
      break;
    case 'PUT':
      putFile( request, respond );
      break;
    case 'DELETE':
      deleteFile( request, respond );
      break;
    default:
      console.log('Invalid request method');

  }

});

server.listen( { port: 8212 }, function() {
  console.log( 'server started http://localhost:8212' );
});