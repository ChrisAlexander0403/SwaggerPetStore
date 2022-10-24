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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPet = exports.getPets = exports.insertPet = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertPet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const pet = req.body;
        if (!pet.name)
            return res.status(400).send("Bad request");
        try {
            const inserted = yield prisma.pet.create({
                data: {
                    name: pet.name,
                    tag: pet.tag
                }
            });
            return res.status(201).json(inserted);
        }
        catch (_a) {
            res.status(500).send("Something went wrong");
        }
    });
}
exports.insertPet = insertPet;
function getPets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pets = yield prisma.pet.findMany();
            res.status(200).json({ pets });
        }
        catch (_a) {
            res.status(500).send("Something went wrong");
        }
    });
}
exports.getPets = getPets;
function getPet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pets = yield prisma.pet.findUnique({
                where: {
                    id: req.body.pet
                }
            });
            res.status(200).json({ pets });
        }
        catch (_a) {
            res.status(500).send("Something went wrong");
        }
    });
}
exports.getPet = getPet;
