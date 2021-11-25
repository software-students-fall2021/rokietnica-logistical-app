var expect = require('expect.js');
var express = require('express');
var expressApp = express();

const assert = require('chai').assert;


describe('app js test', function() {
    describe('GET /stationData', function() {
      it('should respond to GET with empty path', function () {
        expressApp.get('/stationData', function(req, res, body){
          expect(res.status).to.equal(200);
        });
      })
    });
  });

