import express from "express";
import {
  getController,
  getOneController,
  postController,
  updateController,
  deleteController,
} from "../controllers/person.controller.js";

const router = express.Router();
import token from "../jwt/index.js";

router.get("/pessoa", token.check, getController);

router.get("/pessoa/:id", token.check, getOneController);

router.post("/pessoa", token.check, postController);

router.patch("/pessoa/:id", token.check, updateController);

router.delete("/pessoa/:id", token.check, deleteController);

export default router;
