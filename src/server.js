import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {PORT} from './config.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const  swaggerDocs = require('./swagger.json');
import routerPessoa from './routes/person.js';
import routerToken from './routes/generateToken.js';
import routerAnotação from './routes/annotation.js';

const app = express();
const nameAPI = '/api_test_rogalabs/v1';


app.set('port', 3000, PORT);

app.use(express.json());

app.use(nameAPI + '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(nameAPI, routerToken);
app.use(nameAPI, routerPessoa);
app.use(nameAPI, routerAnotação);

app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});

app.listen(app.get('port'), () => console.log("The app server has started!!!"));