// 'use strict'

// const fs          = require('fs');
// const path        = require('path');
// const querystring = require( 'querystring' );
// const url         = require( 'url' );

// module.exports = (function () {

//   //creating these vars so we can use them later
//   var elemNameUri = null;
//   var elementArr = null;

//   var DELETE = function (request, response) {

//     //get client's response
//     request.on( 'data', function (buf) {

//       // take the data and turn them into humanable words!
//       var dataBuf = querystring.parse( buf.toString() );
//       var elemName = dataBuf.elementName;
//         elemNameUri = (dataBuf.elementName + '.html');

//       //look in the directory
//       fs.readdir( './public/', function (err, files) {

//         if ( err ) {
//           console.log( 'error' );
//         }

//         //get rid of files we don't need in the array
//         var elementArr = files.filter( function (e, i, arr) {

//           //if it's not any of these files, justs filter them out
//           return (
//               e !== '.keep' &&
//               e !== '404.html' &&
//               e !== 'index.html' &&
//               e !== 'css' )
//           });

//         //delete given file name from client
//         fs.unlink( './public/' + elemNameUri, function (err, files) {

//           if ( err ) {
//             console.log( 'error' );
//           }
//         }) // end of fs.unlink

//         //here we will read the template file
//         fs.readFile( './templateFile/indexTemplate.html', function (err, contents) {

//           var deleteLink = contents.toString()

//             //let's replace the link with an empty string ===> deleting it
//             .replace( '<li><a href="/'+elemNameUri+'">'+elemName+'</a></li>', '' )

//             // change the element count by taking the newly arranged element array length
//             .replace( /\d+<!-- number -->/, elementArr.length );

//           // rewriting files to update them with replaced values
//           fs.writeFile( './public/index.html', deleteLink, function ( err ) {
//             fs.writeFile( './templateFile/indexTemplate.html', deleteLink, function ( err ) {
//               if ( err ) {
//                 console.log( 'err' );
//               }
//               response.writeHead( 200, {
//                 'Server' : 'Rizzi-lush',
//                });
//                response.end(JSON.stringify ({
//                 'Message' : 'Your post has been deleted',
//                 'success' : true
//               }));
//             }) //end of fs.writeFile
//           }) // end of fs.writeFile
//         }) // end of fs.readFile
//       }) // end of fs.readdir
//     }) // end of request.on( 'data' ....)
//   };

//   return DELETE;

// }());