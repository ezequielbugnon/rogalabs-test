import express from "express";

const router = express.Router();

import token from "../jwt/index.js";

router.get("/anotacao", (req, res) => res.send('hi'));

export default router;
