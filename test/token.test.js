var httpMocks = require('node-mocks-http');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


var { verifyToken, generateToken } = require('../middlewares/token')

var defaultUser = {
  email: "amine@gmail.com",
  name: "amine",
  password: "test",
  id: '1'
}


var req = httpMocks.createRequest();
var res = httpMocks.createResponse();

describe('token ', () => {

  before(() => {
    req.body = defaultUser
  })

  describe('generate token', () => {
    describe('not generate token if privateKey is not exist', () => {

      it('token should not be generated', () => {
        return expect(generateToken(req, res)).to.be.rejectedWith("secretOrPrivateKey must have a value");
      });

    });


    describe('generate token if privateKey is exist', () => {
      before(() => {
        process.env.privateKey = 'test';
      })
      it('token should be generated', () => {
        return expect(generateToken(req, res)).to.eventually.be.fulfilled;
      });

    });
  });

    describe('verify token', () => {


      it('token not exist in headers', () => {
        return expect(verifyToken(req, res)).to.be.rejectedWith("token is required");
      });

      describe('wrong token exist in headers', () => {
        before(() => {
          req.headers.token = 'token'
        })

        it('token should be invalid', () => {
          return expect(verifyToken(req, res)).to.be.rejectedWith("token is invalid");
        });

      });


      describe('valid token exist in headers', () => {
        before(async () => {
          let token =  await generateToken(req, res)
          req.headers.token = token
        })

        it('token should be decrypted', () => {
          return expect(generateToken(req, res)).to.eventually.be.fulfilled;
        });

        it('return id of defaultUser', () => {
          return expect(verifyToken(req, res)).to.eventually.equal(defaultUser.id);
        });

      });

  });

  // describe('verify token', () => {
  //   before(() => {
  //     req.body.cryptedPassword=  req.body.password
  //     req.body.password=  'test password'
  //   })
  //
  //   it('body password should be decrypted', () => {
  //     return expect(checkPassword(req, res)).to.eventually.be.fulfilled;
  //   });
  //
  //   it('decrypted password should be the same as the initial password', () => {
  //     return expect(checkPassword(req, res)).to.eventually.equal(true);
  //   });
  //
  //   it('decrypted password should not be the same as another password', () => {
  //     req.body.password=  'test password1'
  //     return expect(checkPassword(req, res)).to.be.rejectedWith("password not match");
  //   });
  // });

});
