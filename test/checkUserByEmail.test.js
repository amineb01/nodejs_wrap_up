var httpMocks = require('node-mocks-http');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


var checkUserByEmail = require('../middlewares/checkUserByEmail')
var { setUser, getUsers } = require('../middlewares/users')
var User = require('../models/User')
var defaultUser= {email:"amine@gmail.com", name:"amine", password:"test"}


var req = httpMocks.createRequest();
var res = httpMocks.createResponse();

describe('check if user exit by email',  function() {

  before(function() {
    process.env.NODE_ENV = 'test';
    require('../helpers/dbConnect')
    req.body.email= defaultUser.email
    req.body.password=  defaultUser.password
    req.body.name=  defaultUser.name
  })

  describe('without user in database', () => {

    it('should be rejected when user not found', function() {
      return expect(checkUserByEmail(req, res)).to.eventually.be.rejected;
    });

    it('should return user snot found error when user not found', function() {
      return expect(checkUserByEmail(req, res)).to.be.rejectedWith("user not found")

    });
  });


  describe('with user in database', () => {
    before( async function() {
      await setUser(req, res)
    })

    it('should succeed ', function() {
      return expect(checkUserByEmail(req, res)).to.eventually.be.fulfilled;
    })
    after(function() {
      User.deleteMany({}, (err) => console.log('delete users'));
    })
 });


});
