'use strict'

const http          = require( 'http' );
const getFile       = require( './method/GET' );
const postFile      = require( './method/POST' );
const putFile       = require( './method/PUT' );
const deleteFile    = require( './method/DELETE' );

var server = http.createServer( ( request, response ) => {
  request.setEncoding( 'utf-8' );

  //reads request method and invokes fn
  switch (request.method) {

    case 'GET':
      getFile( request, response );
      break;
    case 'POST':
      postFile( request, response );
      break;
    case 'PUT':
      putFile( request, response );
      break;
    case 'DELETE':
      deleteFile( request, response );
      break;
    default:
      console.log('Invalid request method');

  }

});

server.listen( { port: 8888 }, function() {
  console.log( 'server started http://localhost:8888' );
});