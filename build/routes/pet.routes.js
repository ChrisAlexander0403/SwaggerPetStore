"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pet_controller_1 = require("../controllers/pet.controller");
const router = (0, express_1.Router)();
router.route("/pet")
    .get(pet_controller_1.getPet)
    .post(pet_controller_1.insertPet);
router.route("/pets")
    .get(pet_controller_1.getPets);
exports.default = router;
