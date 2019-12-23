import { expect } from 'chai';
import * as sinon from 'sinon';
import OrdersController from "../controllers/orders.controller";
import OrdersAdapter from "../adapters/orders.adapter";
import OrdersService from "../services/orders.service";
import RequestStatus from "../enums/RequestStatus";

describe('Products controller tests', () => {

    const notFoundErrorMessage = "Order not found";
    const commonErrorMessage = "Common Error";
    const response = {
        status: function () {
            return {
                send: function () { }
            }
        }
    };

    let ordersService;
    let ordersAdapter;
    let ordersController;
    let request;
    let sendSpy;
    let statusSpy;
    
    beforeEach(() => {
        ordersService = sinon.createStubInstance(OrdersService);
        ordersAdapter = sinon.createStubInstance(OrdersAdapter);
        ordersController = new OrdersController(ordersService, ordersAdapter);
        request = { body: {}, user: {}, params: {} };
        sendSpy = sinon.spy();
        statusSpy = sinon.stub(response, 'status').returns({ send: sendSpy });
    });

    describe('getAllOrders tests', () => {
        it('getAllOrders should return 500 if orders service throw error', (done) => {
            // Arrange
            ordersService.getAllOrders = () => {
                return new Promise((resolve, reject) => {
                    reject({ message: commonErrorMessage });
                })
            };
            // Act
            ordersController.getAllOrders(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.SERVER_ERROR, done, commonErrorMessage);
            });
        });

        it('getAllOrders should return 200 if orders service return response', (done) => {
            // Arrange
            const responseData = {};
            ordersService.getAllOrders = () => {
                return new Promise((resolve, reject) => {
                    resolve("{}");
                })
            };
            ordersAdapter.prepareResponse = () => {
                return responseData;
            };
            // Act
            ordersController.getAllOrders(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.OK, done, responseData);
            });
        });
    });

    describe('addOrder tests', () => {
        it('addOrder should return 500 if orders service throw error', (done) => {
            // Arrange
            ordersService.addOrder = () => {
                return new Promise((resolve, reject) => {
                    reject({ message: commonErrorMessage });
                })
            };
            // Act
            ordersController.addOrder(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.SERVER_ERROR, done, commonErrorMessage);
            });
        });

        it('addOrder should return 201 if orders service return response', (done) => {
            // Arrange
            const responseData = {};
            ordersService.addOrder = () => {
                return new Promise((resolve, reject) => {
                    resolve("{}");
                })
            };
            ordersAdapter.prepareResponse = () => {
                return responseData;
            };
            // Act
            ordersController.addOrder(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.CREATED, done, responseData);
            });
        });
    });

    describe('addOreditOrderder tests', () => {
        it('editOrder should return 500 if orders service get order throw error', (done) => {
            // Arrange
            ordersService.getOrderById = () => {
                return new Promise((resolve, reject) => {
                    reject({ message: commonErrorMessage });
                })
            };
            // Act
            ordersController.editOrder(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.SERVER_ERROR, done, commonErrorMessage);
            });
        });

        it('editOrder should return 404 if orders service get order not found', (done) => {
            // Arrange
            ordersService.getOrderById = () => {
                return new Promise((resolve, reject) => {
                    resolve();
                })
            };
            // Act
            ordersController.editOrder(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.NOT_FOUND, done, notFoundErrorMessage);
            });
        });

        it('editOrder should return 500 if orders service edit order throw error', (done) => {
            // Arrange
            ordersService.getOrderById = () => {
                return new Promise((resolve, reject) => {
                    resolve("{}");
                });
            };
            ordersAdapter.updateStatus = () => {
                return {};
            };
            ordersService.editOrder = () => {
                return new Promise((resolve, reject) => {
                    reject({ message: commonErrorMessage });
                });
            };
            // Act
            ordersController.editOrder(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.SERVER_ERROR, done, commonErrorMessage);
            });
        });

        it('editOrder should return 200 if orders service edit order return response', (done) => {
            // Arrange
            const responseData = {};
            ordersService.getOrderById = () => {
                return new Promise((resolve, reject) => {
                    resolve("{}");
                });
            };
            ordersAdapter.updateStatus = () => {
                return {};
            };
            ordersService.editOrder = () => {
                return new Promise((resolve, reject) => {
                    resolve({});
                });
            };
            ordersAdapter.prepareResponse = () => {
                return responseData;
            };
            // Act
            ordersController.editOrder(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.OK, done, responseData);
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
