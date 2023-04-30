import express from "express";
const router = express.Router();
import {getController, getOneController, deleteController, postController, updateController} from '../controllers/annotation.controller.js'
import token from "../jwt/index.js";

router.get("/anotacao", token.check, getController);
router.get("/anotacao/:id", token.check, getOneController);
router.post("/anotacao", token.check, postController);
router.delete("/anotacao/:id", token.check, deleteController);
router.patch("/anotacao/:id", token.check, updateController);


export default router;
