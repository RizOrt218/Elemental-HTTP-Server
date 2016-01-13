'use strict'

const fs   = require('fs');
const url  = require( 'url' );

module.exports = (function() {

  var GET = function( request, response ){

    let uri = request.url;

    //redirects client if path is / or empty string
    if ( uri === '/' || '') {
      uri = '/index.html';
    }
    return fs.readFile( './public' + uri, function( err, data ) {

      //returns error file if path is invalid
      if ( err ) {

        return fs.readFile( './public/404.html', function( err, data ) {
          response.writeHead( 404, {
            'Server' : 'Rizzi-lush',
            'Message' : 'Please enter a valid path'
          });
          response.end( data );
        });
      }

      //creates header with proper path request
      response.writeHead( 200, {
        'Server' : 'Rizzi-lush',
        'Content-length' : data.length
      });
        response.end(JSON.stringify ({
         'success' : true
       }));
    }); // end of fs.readFile
  };

  return GET;
}());