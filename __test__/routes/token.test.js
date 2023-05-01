import { Router } from 'express';
import { TokenRouter } from '../../src/routes/generateToken.js';
import token from "../../src/jwt/index.js";


test('test in routes Function tokens response', async() => {
    const router = new TokenRouter(Router(), token);
    const rp = router.start()
    expect(rp.stack.length).toBe(1)
});

