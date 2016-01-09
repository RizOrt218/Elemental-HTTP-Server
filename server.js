var http = require( 'http' );
var fs = require( 'fs' );
var url = require( 'url' );
var querystring = require( 'querystring' );

var elementArr = [ 'hydrogen', 'helium' ];
var elemCount = 2;


var server = http.createServer( function ( req, socket, head ) {
  var newFileName;
  var uri = req.url;

  if ( req.method === 'POST' ) {

    req.on( 'data', function( buffer ) {
      var dataBuffer = querystring.parse( buffer.toString() );

      if ( uri === '/elements' ) {
        return fs.readFile( 'elementalTemplate.html' , function ( err , template ) {
          newFileName = dataBuffer.elementName;

          var tempString = template.toString()
            .replace( /{{elementName}}/g, dataBuffer.elementName )
            .replace( '{{elementSymbol}}', dataBuffer.elementSymbol )
            .replace( '{{elementAtomicNumber}}', dataBuffer.elementAtomicNumber )
            .replace( '{{elementDescription}}', dataBuffer.elementDescription );

          if ( uri === '/elements' ) {

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
                    addElemInArr();

                  });
                  socket.writeHead( 200, {
                    'Server' : 'Rizzi-lush',
                   });
                  socket.end( );
                });
              }); // end of return fs.readFile( 'index..
            }); // end fs.writeFile
          } // end if ( uri === '/elements' )
        }); //end of fs.readFile
      } // end of if ( uri === '/elements' )
    }); // end of req.on( 'data', function( buffer )
  } // end of if ( req.metho ..

  if ( req.method === 'GET' ) {
    if ( uri === '/' ) {
      uri = '/index.html';
    }
    return fs.readFile( './public' + uri, function ( err , data ) {
      if ( err ) {
        return fs.readFile( './public/404.html' , function ( err , data ) {
          socket.writeHead( 404, {
            'Server' : 'Rizzi-lush',
            'Content-length' : data.length,
            'Message' : 'Please write a valid path'
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


function addElemInArr( ) {
  var found = false;

  for ( var i = 0; i < elementArr.length; i++ ) {
    elementArr.push( newFileName );
    found = true;

    // elemCount += 1;
  console.log( newFileName );
  console.log( elementArr );
  console.log( elemCount );
    return found;
  }
} //end of addEleminArr

}); // end of server createServer( )


// grab a random port.
server.listen( { port: 8080 }, function() {
  address = server.address();
  console.log( "opened server on %j", address );
});
