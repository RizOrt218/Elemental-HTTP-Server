'use strict'

const fs   = require('fs');
const path = require('path');
const url  = require( 'url' );

module.exports = (function() {

  var GET = function( request, respond ){
    console.log( 'get request detected!')
    let uri = request.url;

    if ( uri === '/' || '') {
      uri = '/index.html';
    }
    return fs.readFile( './public' + uri, function( err, data ) {
      console.log( uri );
      if ( err ) {
        return fs.readFile( './public/404.html', function( err, data ) {
          respond.writeHead( 404, {
            'Server' : 'Rizzi-lush',
            'Message' : 'Please enter a valid path'
          });
          respond.end( data );
        });
      }
      respond.writeHead( 200, {
        'Server' : 'Rizzi-lush',
        'Content-length' : data.length
      });
      respond.end( data );
    }); // end of fs.readFile
  };

  return GET;
}());