var http = require( 'http' );
var fs = require( 'fs' );
var url = require('url');

var server = http.createServer( serversEventListener );



// grab a random port.
server.listen( { port: 8080 }, function() {
  address = server.address();
  console.log( "opened server on %j", address );
});