'use strict'

const fs          = require('fs');
const querystring = require( 'querystring' );

module.exports = (function() {
  var elemCount = 2;

  var updateIndex = function( request, response ) {

    request.on( 'data', function ( buffer ) {
      var dataBuffer = querystring.parse( buffer.toString() );

      //** this will update the index with new element and element count
      return fs.readFile( './templateFile/indexTemplate.html', function ( err, contents ) {
        var pageLink = '<li><a href="/{{elementName}}.html">{{elementName}}</a></li>';
          elemCount += 1;

        var appendNewElem = contents.toString()
          .replace( '<!--  {{ element list }} -->', pageLink + '<!--  {{ element list }} -->' )
          .replace( /{{elementName}}/g, dataBuffer.elementName )
          .replace( /\d+<!-- number -->/, elemCount + '<!-- number -->');

        return fs.writeFile( './public/index.html', appendNewElem , function( err ) {
          fs.writeFile( './templateFile/indexTemplate.html', appendNewElem , function( err ) {
            if ( err ) { //do later
              console.log ( 'error' );
            }
          });
          response.writeHead( 200, {
            'Server' : 'Rizzi-lush',
           });
          response.end( );
        });
      }); // end of return fs.readFile(
    });

  };
  return updateIndex;
}());