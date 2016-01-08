var http = require( 'http' );
var fs = require( 'fs' );
var url = require( 'url' );
var querystring = require( 'querystring' );


var server = http.createServer( function ( req, socket, head ) {
  var uri = req.url;

  if ( req.method === 'POST' ) {
    console.log( "post detected" );
    req.on( 'data', function( buffer ) {
      var dataBuffer = querystring.parse( buffer.toString() );

      if ( uri === '/elements' ) {
        return fs.readFile( 'elementalTemplate.html' , function ( err , template ) {
          var newFileName = dataBuffer.elementName;

            var tempString = template.toString()
              .replace( /{{elementName}}/g, dataBuffer.elementName )
              .replace( '{{elementSymbol}}', dataBuffer.elementSymbol )
              .replace( '{{elementAtomicNumber}}', dataBuffer.elementAtomicNumber )
              .replace( '{{elementDescription}}', dataBuffer.elementDescription );

            if ( uri === '/elements' ) {
              return fs.writeFile( './public' + '/' + newFileName  + '.html', tempString , function( err, tempString ) {

                socket.writeHead( 200, {
                  'Server' : 'Rizzi-lush',
                });
                socket.end( tempString );

                return fs.readFile( 'indexTemplate.html', function ( err, contents ) {

                  var appendNewElem = contents.toString()
                    .replace( /{{elementName}}/g, newFileName );
                  console.log( appendNewElem);
                  return fs.writeFile( './public/index.html', appendNewElem , function( err, appendNewElem ) {

                    socket.writeHead( 200, {
                      'Server' : 'Rizzi-lush',
                    });
                    socket.end( appendNewElem );
                  });
                });
              }); // end fs.writeFile
            } // end if ( uri === '/elements' ) {
        }); //end of fs.readFile
      } // end of if ( uri === '/elements' )
    }); // end of req.on( 'data', function( buffer )
  }

  if ( req.method === 'GET' ) {
    if ( uri === '/' ) {
      uri = '/index.html';
    }
    return fs.readFile( './public' + uri, function ( err , data ) {
      if ( err ) {
        return fs.readFile( './public/404.html' , function ( err , data ) {
          socket.writeHead( 404, {
            'Server' : 'Rizzi-lush',
            'Content-length' : data.length
          });
          socket.end( data );
        });
      }
      socket.writeHead( 200, {
        'Server' : 'Rizzi-lush',
        'Content-length' : data.length
      });
      socket.end( data );
    }); // end of fs.readFile
  } // GET method
}); //end of server createServer( )

// grab a random port.
server.listen( { port: 8080 }, function() {
  address = server.address();
  console.log( "opened server on %j", address );
});
