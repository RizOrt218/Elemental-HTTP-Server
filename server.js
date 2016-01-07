var http = require( 'http' );
var fs = require( 'fs' );
var url = require( 'url' );
var querystring = require( 'querystring' );


var server = http.createServer( function ( req, socket, head ) {
  // req.setEncoding( 'utf-8' );
  var uri = req.url;

  // console.log( req );
  console.log( head );
  // console.log( req.url );

  if ( req.method === 'POST' ) {
    console.log( "post detected" );
    if ( uri === '/elements.html' ) {
      return fs.readFile( './public/helium.html' , function ( err , data ) {
        return fs.writeFile( './public' + uri , data , function( err, data ) {
          return fs.readFile( './public' + uri , data , function( err, data ) {

            console.log( data.toString() );
            req.on( 'data', function( buffer ) {
              var dataBuffer = querystring.parse( buffer.toString() );
              console.log( dataBuffer );
            });

           socket.writeHead( 200, {
            'Server' : 'Rizzi-lush',
            'Content-length' : data.length
          });
          socket.end( data );
          });
        });
      });
    }
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
