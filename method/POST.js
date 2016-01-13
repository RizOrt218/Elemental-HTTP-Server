'use strict'

const fs          = require('fs');
const querystring = require( 'querystring' );
const url         = require( 'url' );
const updateIndex = require( '../templateFile/indexHandler' );
const headHandler = require( './header' );

//* TODO*//

module.exports = (function() {
  var newFileName = null;
  var elemCount = 2;

  var POST = function ( request, respond ) {
    var uri = request.url;

    //lets find out what the client is posting
    request.on( 'data', function ( buffer ) {
      var dataBuffer = querystring.parse( buffer.toString() );

      //if client is on this uri
      if ( uri === '/elements' ) {

        //when client creates a post, this will generate a new file with client's new post
        return fs.readFile( './templateFile/elementalTemplate.html', function ( err , template ) {

          //getting the clients' new file name input
          newFileName = (dataBuffer.elementName).toLowerCase();

          if ( err ) { //do later
            console.log( 'error' );
          }

          //will replace template elements with new values
          var renderTemplate = template.toString()
            .replace( /{{elementName}}/g, dataBuffer.elementName )
            .replace( '{{elementSymbol}}', dataBuffer.elementSymbol )
            .replace( '{{elementAtomicNumber}}', dataBuffer.elementAtomicNumber )
            .replace( '{{elementDescription}}', dataBuffer.elementDescription );

          //create brand new file with client's post
          return fs.writeFile( './public/' + newFileName + '.html', renderTemplate, function ( err ) {

            respond.writeHead( 200, {
              'Server' : 'Rizzi-lush',
             });
               respond.end(JSON.stringify ({
                'success' : true
              }));
          }); // end fs.writeFile
        }); //end of fs.readFile
      } // end of if ( uri === '/elements' )
    });

    //invoke to update index file
    updateIndex(request, respond);

  }; // end of POST function

  return POST;
}());