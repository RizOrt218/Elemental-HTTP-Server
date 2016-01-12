'use strict'

const fs          = require('fs');
const path        = require('path');
const querystring = require( 'querystring' );
const url         = require( 'url' );

module.exports = (function () {
  var fileName = null;

  var DELETE = function (request, respond) {
      console.log( 'Client is requesting to Delete!' );
    //get client's respond
    request.on( 'data', function (buf) {
      var dataBuf = querystring.parse( buf.toString() );
        fileName = (dataBuf.elementName + '.html').toLowerCase();

    //look in the directory
      fs.readdir( './public/', function (err, files) {
          var elemCount = files.length;

        if ( err ) {
          console.log( 'error' );
        }

    //delete given file name from client
        fs.unlink( './public/' + fileName, function (err, files) {
          console.log(elemCount);
          if ( err ) {
            console.log( 'error' );
          }
        }) // end of fs.unlink
      }) // end of fs.readdir

      fs.readFile( './templateFile/indexTemplate.html', function (err, contents) {
        var pageLink = '<li><a href="/{{'+ fileName +'}}.html">{{'+ fileName +'}}</a></li>';

        var deleteLink = contents.toString()
          .replace( pageLink, '')
          .replace( /\d+<!-- number -->/, elemCount );

        fs.writeFile( './public/index.html', deleteLink, function ( err ) {

          if ( err ) {
            console.log( 'err' );
          }
        })
      }) // end of fs.readFile
    }) // end of request.on( 'data' ....)
  };
  return DELETE;
}());