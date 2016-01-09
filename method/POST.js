'use strict'

const fs          = require('fs');
const path        = require('path');
const querystring = require( 'querystring' );
const url         = require( 'url' );
const tempHandler = request( './templateFile/tempHandler' );

module.exports = (function() {

  var POST = function( request, respond ) {
    let uri = request.url;

    //lets find out what the client is posting
    request.on( 'data', function( buffer ) {
      var dataBuffer = querystring.parse( buffer.toString() );

      if ( uri === '/elements' ) {
        tempHandler( request, respond );

        return fs.readFile( 'elementalTemplate.html' , function ( err , template ) {
          newFileName = dataBuffer.elementName;

          var tempString = template.toString()
            .replace( /{{elementName}}/g, dataBuffer.elementName )
            .replace( '{{elementSymbol}}', dataBuffer.elementSymbol )
            .replace( '{{elementAtomicNumber}}', dataBuffer.elementAtomicNumber )
            .replace( '{{elementDescription}}', dataBuffer.elementDescription );

          return fs.writeFile( './public/' + newFileName  + '.html', tempString , function( err, tempString ) {

            socket.writeHead( 200, {
              'Server' : 'Rizzi-lush',
            });
            socket.end( tempString );

            return fs.readFile( 'indexTemplate.html', function ( err, contents ) {
              var pageLink = '<li><a href="/{{elementName}}.html">{{elementName}}</a></li>';
              elemCount += 1;

              var appendNewElem = contents.toString()
                .replace( '<!--  {{ element list }} -->', pageLink + '<!--  {{ element list }} -->' )
                .replace( /{{elementName}}/g, dataBuffer.elementName )
                .replace( /\d+<!-- number -->/, elemCount + '<!-- number -->');

              return fs.writeFile( './public/index.html', appendNewElem , function( err ) {
                fs.writeFile( 'indexTemplate.html', appendNewElem , function( err ) {

                  console.log(tempString);
                  // addElemInArr();

                });
                socket.writeHead( 200, {
                  'Server' : 'Rizzi-lush',
                 });
                socket.end( );
              });
            }); // end of return fs.readFile( 'index..
          }); // end fs.writeFile
        }); //end of fs.readFile
      } // end of if ( uri === '/elements' )
});

  }; // end of POST function

  return POST;
}());