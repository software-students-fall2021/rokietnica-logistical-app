var expect = require('expect.js');
var express = require('express');
var expressApp = express();

const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const server = "./app.js"

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
