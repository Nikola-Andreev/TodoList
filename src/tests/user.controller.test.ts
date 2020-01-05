import { expect } from 'chai';
import * as sinon from 'sinon';
import UsersController from "../controllers/users.controller";
import UsersService from "../services/users.service";
import JWT from "../middlewares/jwt.middleware";
import RequestStatus from "../enums/RequestStatus";

describe('Users controller tests', () => {

    const commonErrorMessage = "Common Error";
    const response = {
        status: function () {
            return {
                send: function () { }
            }
        }
    };

    let usersService;
    let jwt;
    let usersController;
    let request;
    let sendSpy;
    let statusSpy;

    beforeEach(() => {
        usersService = sinon.createStubInstance(UsersService);
        jwt = sinon.createStubInstance(JWT);
        usersController = new UsersController(usersService, jwt);
        request = { body: {} };
        sendSpy = sinon.spy();
        statusSpy = sinon.stub(response, 'status').returns({ send: sendSpy });
    });

    describe('Login tests', () => {
        it('login should return 500 if user service throw error', (done) => {
            // Arrange
            usersService.login = () => {
                return new Promise((resolve, reject) => {
                    reject({ message: commonErrorMessage });
                })
            };
            // Act
            usersController.login(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.SERVER_ERROR, done, commonErrorMessage);
            });
        });

        it('login should return 401 if credentials are wrong', (done) => {
            // Arrange
            usersService.login = () => {
                return new Promise((resolve, reject) => {
                    resolve({ error: commonErrorMessage, description: commonErrorMessage });
                })
            };
            // Act
            usersController.login(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.UNAUTHORIZED, done, commonErrorMessage);
            });
        });

        it('login should return 200 if credentials are correct', (done) => {
            // Arrange
            const expectedToken = "token";
            usersService.login = () => {
                return new Promise((resolve, reject) => {
                    resolve({ id: "" });
                })
            };
            jwt.generateToken = () => {
                return expectedToken;
            };
            // Act
            usersController.login(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.OK, done, `jwt ${expectedToken}`);
            });
        });
    });

    function verify(statusSpy: sinon.SinonStub, sendSpy: sinon.SinonSpy, expectedStatus: number, done: Function, responseData: any) {
        try {
            expect(statusSpy.getCall(0).args[0]).to.equal(expectedStatus);
            expect(sendSpy.getCall(0).args[0]).to.equal(responseData);
            done();
        } catch (err) {
            done(err);
        } finally {
            statusSpy.restore();
        }
    }
});
