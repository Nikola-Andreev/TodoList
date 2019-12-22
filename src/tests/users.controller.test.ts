import { expect } from 'chai';
import * as sinon from 'sinon';
// import { Request } from "express";
import UsersController from "../controllers/users.controller";
import UsersService from "../services/users.service";
import JWT from "../configurations/jwt.configuration";

describe('Users controller tests', () => {

    const commonErrorMessage = "Common Error";
    const response = {
        status: function (code) {
            return {
                send: function (msg) { }
            }
        }
    };

    let usersService;
    let jwt;
    let usersController;
    
    beforeEach(() => {
        usersService = sinon.createStubInstance(UsersService);
        jwt = sinon.createStubInstance(JWT);
        usersController = new UsersController(usersService, jwt);
    });

    // it('login should return 500 if user service throw error', (done) => {
    //     usersService.login = () => {
    //         return new Promise((resolve, reject) => {
    //             reject({ message: commonErrorMessage });
    //         })
    //     };
    //     const request = { body: {} };
    //     const sendSpy = sinon.spy();
    //     const statusSpy = sinon.stub(response, 'status').returns({ send: sendSpy });
    //     usersController.login(request, response).then(() => {
    //         verify(statusSpy, sendSpy, 500, done, commonErrorMessage);
    //     });
    // });

    it('login should return 401 if credentials are wrong', (done) => {
        usersService.login = () => {
            return new Promise((resolve, reject) => {
                resolve({ error: commonErrorMessage });
            })
        };
        const request = { body: { username: "", password: ""} };
        const sendSpy = sinon.spy();
        const statusSpy = sinon.stub(response, 'status').returns({ send: sendSpy });
        return usersController.login(request, response).then(() => {
            verify(statusSpy, sendSpy, 401, done, commonErrorMessage);
        });
    });

    function verify(statusSpy: sinon.SinonStub, sendSpy: sinon.SinonSpy, expectedStatus: number, done: Function, responseData: any) {
        console.log(statusSpy.getCall(0).args[0]);
        console.log(sendSpy.getCall(0).args[0]);
        expect(statusSpy.getCall(0).args[0]).to.equal(expectedStatus);
        expect(sendSpy.getCall(0).args[0]).to.equal(responseData);
        statusSpy.restore();
        done();
    }
});