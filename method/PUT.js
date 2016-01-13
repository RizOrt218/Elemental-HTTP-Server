'use strict'

const fs          = require('fs');
const querystring = require( 'querystring' );
const url         = require( 'url' );
const postMethod  = require( './POST');

module.exports = (function() {
  var fileName = null;
  var exist = false;

  var PUT = function  (request, respond) {
    var uri = request.url + '.html'; //elements.html

    console.log( 'put request detected!' );

    request.on( 'data', function (buffer) {
      var dataBuffer = querystring.parse( buffer.toString() );
        fileName = (dataBuffer.elementName + '.html').toLowerCase();

      //reads directory and creates array of files in memory
      fs.readdir( './public/', function (err, files) {

        if ( err ) {
          console.log( 'error' );
        }

        //get rid of files we don't need in the array
        var elementArr = files.filter( function (e, i, arr) {
          return (
              e !== '.keep' &&
              e !== '404.html' &&
              e !== 'index.html' &&
              e !== 'css' )
          });

        //see if file already exist
        if ( elementArr.indexOf( fileName ) !== -1 ) {
          exist = true;
        }

        //create new file and save it on original file
        if ( exist ) {
          return fs.readFile( './templateFile/elementalTemplate.html', function ( err, template ) {

            if ( err ) {
              console.log ( 'error' );
            }
            //will replace template elements with new values
            var renderTemplate = template.toString()
              .replace( /{{elementName}}/g, dataBuffer.elementName )
              .replace( '{{elementSymbol}}', dataBuffer.elementSymbol )
              .replace( '{{elementAtomicNumber}}', dataBuffer.elementAtomicNumber )
              .replace( '{{elementDescription}}', dataBuffer.elementDescription );

            //override file with client's changes
            return fs.writeFile( './public/' + fileName, renderTemplate, function (err) {

              respond.writeHead( 200, { //do later
                'Server' : 'Rizzi-lush',
              });
                respond.end(JSON.stringify ({
                 'success' : true
               }));
            });
              // respond.end( renderTemplate );
          }); // end fs.readFile
        } else {
          // return error
        }
      }); // end of fs readir
    }) // end of request.on
  }; // end of PUT fn
  return PUT;
}());