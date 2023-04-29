
import { Router } from "express";

const router = Router();

import token from '../jwt/index.js';

router.get('/token/:name', async (req, res) => {

   const {name} = req.params;

   if(name === "" || name === undefined){
      res.status(401).json("Unauthorized, send a name")
   }

   const response = await token.create({'name': name})

   res.status(200).json({token: response})
});

export default router;