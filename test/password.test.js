var httpMocks = require('node-mocks-http');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


var { checkPassword, generatePassword } = require('../middlewares/password')
var { setUser, getUsers } = require('../middlewares/users')
var User = require('../models/User')
var defaultUser= {email:"amine@gmail.com", name:"amine", password:"test"}


var req = httpMocks.createRequest();
var res = httpMocks.createResponse();

describe('check if user exit by email',  function() {

  before(function() {
    req.body.password=  'test password'
  })

  describe('generate password', () => {

    it('body password should be crypted', function() {
      return expect(generatePassword(req, res)).to.eventually.be.fulfilled;
    });

    it('body password should not be the same', function() {
      return expect(Promise.resolve(req.body.password)).to.eventually.not.equal('test password');
    });
  });

  describe('verify password', () => {
    before(function() {
      req.body.cryptedPassword=  req.body.password
      req.body.password=  'test password'
    })

    it('body password should be decrypted', function() {
      return expect(checkPassword(req, res)).to.eventually.be.fulfilled;
    });

    it('decrypted password should be the same as the initial password', function() {
      return expect(checkPassword(req, res)).to.eventually.equal(true);
    });

    it('decrypted password should not be the same as another password', function() {
      req.body.password=  'test password1'
      return expect(checkPassword(req, res)).to.be.rejectedWith("password not match");
    });
  });

});
