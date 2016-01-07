var http = require( 'http' );
var fs = require( 'fs' );
var url = require('url');


var server = http.createServer( function ( req, socket, head ) {
  // req.setEncoding( 'utf-8' );
  var uri = req.url;

  // console.log( req );
  // console.log( req.headers );
  // console.log( req.url );

    socket.writeHead( 200, {});

  if ( req.method === 'POST' ) {
    console.log( "post detected" );
  }

  if ( req.method === 'GET' ) {
    return fs.readFile( './public' + uri, function ( err , data ) {
      if ( err ) {
          return fs.readFile( './public/404.html' , function ( err , data ) {
            socket.write( data );
            socket.end( );
          });
      }
      socket.write( data );
      socket.end( );
    }); // end of fs.readFile
  } // GET method
}); //end of server createServer( )

// grab a random port.
server.listen( { port: 8080 }, function() {
  address = server.address();
  console.log( "opened server on %j", address );
});
