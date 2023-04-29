import jwt from 'jsonwebtoken';
import {CONFIG_SECRET} from '../config.js'
const token = {}

token.create = async (paylod) => {
    const tk = await jwt.sign(paylod, CONFIG_SECRET, {
        expiresIn: '3h'
    })
    return tk
}


token.check = async (req, res, next) => {
    const tk = req.headers['authorization'];
    if(!tk){
        return res.status(401).send({ auth: false, token: 'Token is not provided' })
    }

    try {
        const decoded = await jwt.verify(tk, CONFIG_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).send({ auth: false, token: 'Invalid token' })
    }
    
}


export default token;