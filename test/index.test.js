"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const supertest_1 = __importDefault(require("supertest"));
const app = new app_1.App(3000).app;
describe('GET /pets', () => {
    test('should respond status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/pets').send();
        expect(response.statusCode).toBe(200);
    }));
    test('should respond with an array', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/pets').send();
        expect(response.body).toBeInstanceOf(Object);
    }));
});
describe('POST /pet', () => {
    describe("Given a name and tag", () => {
        test('status code 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/pet').send({
                name: "Oliver",
                tag: "Frech"
            });
            expect(response.statusCode).toBe(201);
        }));
        test('content-type of application/json', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/pet').send({
                name: "Polo",
                tag: "Cat"
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        }));
        test('json object containing the new pet with an id', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/pet').send({
                name: "Peter",
                tag: "Cat"
            });
            expect(response.body.id).toBeDefined();
        }));
        test('json object containing the new pet with a name', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/pet').send({
                name: "Peter",
                tag: "Cat"
            });
            expect(response.body.name).toBeDefined();
        }));
    });
    describe("Name or Tag missing", () => {
        test('Status code 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/pet').send();
            expect(response.status).toBe(400);
        }));
    });
});
