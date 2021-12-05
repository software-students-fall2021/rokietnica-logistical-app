const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const should = chai.should();

const mongoose = require('mongoose');

const server = require("../app");

describe("Login", () => {
  after(function(done){
      mongoose.connection.close(done)
  })
  const correctUser = {
    username: "s",
    password: "123"
  }
  describe("POST /login with correct username/password", () => {
    it("it should return a 200 HTTP response code", done => {
      chai
        .request(server)
        .post("/login")
        .type("form")
        .send(correctUser)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
  const incorrectUser = {
    username: "false",
    password: "wrong"
  }
  describe("POST /login with incorrect username/password", () => {
    it("it should return a 401 HTTP response code", done => {
      chai
        .request(server)
        .post("/login")
        .type("form")
        .send({
          username: "false",
          password: "wrong"
        })
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
  })

})
