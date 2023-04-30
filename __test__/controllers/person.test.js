import mocks from 'node-mocks-http';
import { getController } from '../../src/controllers/person.controller';

test('test in controllers getPerson', async() => {
    const req = mocks.createRequest({
        method: 'GET',
        url: '/pessoa',
    });

    const res = mocks.createResponse();
    const data = await getController(req, res)
    console.log(data)
   // expect(data).toBe(false);
});