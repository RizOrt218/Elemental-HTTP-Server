'use strict'

const fs          = require('fs');
const path        = require('path');
const querystring = require( 'querystring' );
const url         = require( 'url' );

module.exports = (function () {
  var elemName = null;

  var DELETE = function (request, respond) {
      console.log( 'Client is requesting to Delete!' );
    //get client's respond
    request.on( 'data', function (buf) {
      var dataBuf = querystring.parse( buf.toString() );
        elemName = (dataBuf.elementName + '.html');
console.log( elemName );
    //look in the directory
      fs.readdir( './public/', function (err, files) {
          var elemCount = files.length;

        if ( err ) {
          console.log( 'error' );
        }

    //delete given file name from client
        fs.unlink( './public/' + elemName, function (err, files) {
          console.log(elemCount);
          if ( err ) {
            console.log( 'error' );
          }
        }) // end of fs.unlink
      }) // end of fs.readdir
      //here we will read the template file
      fs.readFile( './templateFile/indexTemplate.html', function (err, contents) {
        console.log( elemName );
        //let's replace the link with an empty string
        var deleteLink = contents.toString()
          .replace( '<li><a href="/'+elemName+'">rizzleDizzle</a></li>', '' );
          // .replace( /\d+<!-- number -->/, elemCount );

        return fs.writeFile( './public/index.html', deleteLink, function ( err ) {
          fs.writeFile( './templateFile/indexTemplate.html', deleteLink, function ( err ) {
            if ( err ) {
              console.log( 'err' );
            }
            respond.writeHead( 200, {
              'Content-Type' : 'application/json'
             });
             respond.end(JSON.stringify ({
              'success' : true
            }));
          })
        })
      }) // end of fs.readFile
    }) // end of request.on( 'data' ....)
  };
  return DELETE;
}());