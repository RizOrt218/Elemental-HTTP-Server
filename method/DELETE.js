'use strict'

const fs          = require('fs');
const path        = require('path');
const querystring = require( 'querystring' );
const url         = require( 'url' );

module.exports = (function (){
  var fileName = null;

  var DELETE = function ( request, respond ) {
      console.log( 'Client is requesting to Delete!' );
    //get client's respond
    request.on( 'data', function ( buf ) {
      var dataBuf = querystring.parse( buf.toString() );
        fileName = dataBuf.elementName + '.html';

    //look in the directory
      fs.readdir( './public/', function (err, files) {

        if ( err ) {
          console.log( 'error' );
        }

    //delete given file name from client
        fs.unlink( './public/' + fileName, function ( err ) {

          if ( err ) {
            console.log( 'error' );
          }
        }) // end of fs.unlink
      }) // end of fs.readdir

    }) // end of request.on( 'data' ....)
  };
  return DELETE;
}());