'use strict'

const fs          = require('fs');
const path        = require('path');
const querystring = require( 'querystring' );
const url         = require( 'url' );
const postMethod  = require( './POST');

module.exports = (function() {
  var newFileName;


  var PUT = function  ( request, respond ){
    var uri = request.url + '.html'; //elements.html

    console.log( 'put request detected!' );

    request.on( 'data', function (buffer) {
      var dataBuffer = querystring.parse( buffer.toString() );
        newFileName = dataBuffer.elementName + '.html';
        console.log( newFileName);
    })

    //reads directory and creates array of files in memory
    fs.readdir( './public/', function (err, files) {

      if ( err ) {
        console.log( err );
      }

      //get rid of files we don't need in the array
      var elementArr = files.filter( function ( e, i, arr ) {
        return (
            e !== '.keep' &&
            e !== '404.html' &&
            e !== 'index.html' &&
            e !== 'css' )
      });
        console.log( 'after', elementArr );

      //loop through files and match put request to current array
      for( var i = 0; i < elementArr.length; i++ ) {
        if ( newFileName === elementArr[i] ) {
          //replace file with current client's updates
          postMethod ( request, respond );
          break;
        }
        else {
          console.log( 'use proper method' );
        }
      } // end of for loop
    }) // end of fs readir

  };
  return PUT;
}());