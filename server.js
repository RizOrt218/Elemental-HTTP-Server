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
      console.log( dataBuffer );

      if ( uri === '/elements' ) {
        return fs.readFile( 'elementalTemplate.html' , function ( err , template ) {

            var tempString = template.toString();
            var renName = tempString.replace( '{{elementName}}', dataBuffer.elementName );
            var renSymbol = renName.replace( '{{elementSymbol}}', dataBuffer.elementSymbol );
            var renAtomicNum = renSymbol.replace( '{{elementAtomicNumber}}', dataBuffer.elementAtomicNumber );
            var renDes = renAtomicNum.replace( '{{elementDescription}}', dataBuffer.elementDescription );
            console.log( renDes );

            socket.end( renDes );
          return fs.writeFile( './public' + uri  + '.html', renDes , function( err, renDes ) {
            socket.writeHead( 200, {
              'Server' : 'Rizzi-lush',
              // 'Content-length' : renDes.length
            });
            socket.end( renDes );
          }); // end of fs.writeFile
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
