var checkUserByEmail = require('../middlewares/checkUserByEmail')
var { setUser, getUsers } = require('../middlewares/users')

var httpMocks = require('node-mocks-http');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var defaultUser= {email:"amine@gmail.com", name:"amine", password:"test"}


var req = httpMocks.createRequest();
var res = httpMocks.createResponse();

describe('check if user exit by email', async function() {

  beforeEach(function() {
    process.env.NODE_ENV = 'test';

    req.body.email= 'test@gmail.com'
    require('../helpers/dbConnect')

  }),

  it('should succeed ', function() {
    return expect(Promise.resolve('woof')).to.eventually.equal('woof');
   });

  it('should be rejected when user not found', function() {
    return expect(checkUserByEmail(req, res)).to.eventually.be.rejected;
  });

  it('should return user snot found error when user not found', function() {
    return expect(checkUserByEmail(req, res)).to.be.rejectedWith("user not found")

  });

});
