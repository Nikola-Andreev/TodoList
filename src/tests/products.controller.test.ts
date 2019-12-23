import { expect } from 'chai';
import * as sinon from 'sinon';
import ProductsController from "../controllers/products.controller";
import ProductsAdapter from "../adapters/products.adapter";
import ProductsService from "../services/products.service";
import RequestStatus from "../enums/RequestStatus";

describe('Products controller tests', () => {

    const notFoundErrorMessage = "Product not found";
    const commonErrorMessage = "Common Error";
    const response = {
        status: function () {
            return {
                send: function () { }
            }
        }
    };

    let productsService;
    let productsAdapter;
    let productsController;
    let request;
    let sendSpy;
    let statusSpy;
    
    beforeEach(() => {
        productsService = sinon.createStubInstance(ProductsService);
        productsAdapter = sinon.createStubInstance(ProductsAdapter);
        productsController = new ProductsController(productsService, productsAdapter);
        request = { body: {}, user: {}, params: {} };
        sendSpy = sinon.spy();
        statusSpy = sinon.stub(response, 'status').returns({ send: sendSpy });
    });

    describe('getAllProducts tests', () => {
        it('getAllProducts should return 500 if products service throw error', (done) => {
            // Arrange
            productsService.getAllProducts = () => {
                return new Promise((resolve, reject) => {
                    reject({ message: commonErrorMessage });
                })
            };
            // Act
            productsController.getAllProducts(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.SERVER_ERROR, done, commonErrorMessage);
            });
        });

        it('getAllProducts should return 200 if products service return response', (done) => {
            // Arrange
            const result = [];
            productsService.getAllProducts = () => {
                return new Promise((resolve, reject) => {
                    resolve("[]");
                })
            };
            productsAdapter.prepareResponse = () => {
                return result;
            };
            // Act
            productsController.getAllProducts(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.OK, done, result);
            });
        });
    });

    describe('addProducts tests', () => {
        it('addProducts should return 500 if products service throw error', (done) => {
            // Arrange
            productsService.addProduct = () => {
                return new Promise((resolve, reject) => {
                    reject({ message: commonErrorMessage });
                })
            };
            // Act
            productsController.addProduct(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.SERVER_ERROR, done, commonErrorMessage);
            });
        });

        it('addProducts should return 201 if products service return response', (done) => {
            // Arrange
            const result = {};
            productsService.addProduct = () => {
                return new Promise((resolve, reject) => {
                    resolve();
                })
            };
            productsAdapter.prepareResponse = () => {
                return result;
            };
            // Act
            productsController.addProduct(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.CREATED, done, result);
            });
        });
    });

    describe('editProduct tests', () => {
        it('editProduct should return 500 if service get product throw error', (done) => {
            // Arrange
            productsService.getProductById = () => {
                return new Promise((resolve, reject) => {
                    reject({ message: commonErrorMessage });
                })
            };
            // Act
            productsController.editProduct(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.SERVER_ERROR, done, commonErrorMessage);
            });
        });

        it('editProduct should return 404 if product not found', (done) => {
            // Arrange
            productsService.getProductById = () => {
                return new Promise((resolve, reject) => {
                    resolve(JSON.stringify({ error: notFoundErrorMessage }));
                })
            };
            // Act
            productsController.editProduct(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.NOT_FOUND, done, notFoundErrorMessage);
            });
        });

        it('editProduct should return 500 if service edit product throw error', (done) => {
            // Arrange
            productsService.getProductById = () => {
                return new Promise((resolve, reject) => {
                    resolve("{}");
                })
            };
            productsAdapter.mergeObjects = () => {
                return {};
            }
            productsService.editProduct = () => {
                return new Promise((resolve, reject) => {
                    reject({ message: commonErrorMessage });
                })
            }
            // Act
            productsController.editProduct(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.SERVER_ERROR, done, commonErrorMessage);
            });
        });

        it('editProduct should return 200 if service edit product return response', (done) => {
            // Arrange
            const responseData = {};
            productsService.getProductById = () => {
                return new Promise((resolve, reject) => {
                    resolve("{}");
                })
            };
            productsAdapter.mergeObjects = () => {
                return {};
            }
            productsService.editProduct = () => {
                return new Promise((resolve, reject) => {
                    resolve();
                })
            }
            productsAdapter.prepareResponse = () => {
                return responseData;
            }
            // Act
            productsController.editProduct(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.OK, done, responseData);
            });
        });
    });

    describe('deleteProduct tests', () => {
        it('deleteProduct should return 500 if service delete product throw error', (done) => {
            // Arrange
            productsService.deleteProduct = () => {
                return new Promise((resolve, reject) => {
                    reject({ message: commonErrorMessage });
                })
            };
            // Act
            productsController.deleteProduct(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.SERVER_ERROR, done, commonErrorMessage);
            });
        });

        it('deleteProduct should return 404 if product not found', (done) => {
            // Arrange
            productsService.deleteProduct = () => {
                return new Promise((resolve, reject) => {
                    resolve(JSON.stringify({ error: notFoundErrorMessage }));
                })
            };
            // Act
            productsController.deleteProduct(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.NOT_FOUND, done, notFoundErrorMessage);
            });
        });

        it('deleteProduct should return 200 if product is deleted', (done) => {
            // Arrange
            productsService.deleteProduct = () => {
                return new Promise((resolve, reject) => {
                    resolve("{}");
                })
            };
            // Act
            productsController.deleteProduct(request, response).then(() => {
                // Assert
                verify(statusSpy, sendSpy, RequestStatus.OK, done, undefined);
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
