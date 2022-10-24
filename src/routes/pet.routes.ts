import { Router } from "express";
import { getPet, getPets, insertPet } from "../controllers/pet.controller";

const router = Router();

router.route("/pet")
    .get(getPet)
    .post(insertPet);

router.route("/pets")
    .get(getPets);

export default router;