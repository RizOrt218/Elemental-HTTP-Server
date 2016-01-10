'use strict'

const fs          = require('fs');
const path        = require('path');
const querystring = require( 'querystring' );
const url         = require( 'url' );

module.exports = (function () {

  var createHead = function (request, respond) {

    respond.writeHead( 200, {
      'Server' : 'Rizzi',
      'Success': 'true',
    })

  }
  return createHead;
}());