import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import listEndpoints from 'express-list-endpoints'
import cors from "cors";
import { pool } from "./db/db.js";
import token from "./jwt/index.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocs = require("./swagger.json");
import { PersonRouter } from "./routes/person.js";
import { TokenRouter } from "./routes/generateToken.js";
import { AnnotationRouter } from "./routes/annotation.js";
import { AnnotationRepository } from "./repository/annotation.repository.js";
import { PersonRepository } from "./repository/person.repository.js";
import { PersonController } from "./controllers/person.controller.js";
import { AnnotationController } from "./controllers/annotation.controller.js";
import { validateCep } from "./utils/validateCep.js";
import { getCep } from "./utils/getCep.js";
import { personSchema, personUpdateSchema } from "./validators/person.js";
import {
  anotationSchema,
  anotationUpdateSchema,
} from "./validators/annotation.js";

export class Server {
  constructor(
    db,
    token,
    personSchema,
    personUpdateSchema,
    getCep,
    validateCep,
    anotationSchema,
    anotationUpdateSchema
  ) {
    this.db = db;
    this.token = token;
    this.app = express();
    this.router = Router();
    this.personRepository = new PersonRepository(this.db);
    this.annotationRepository = new AnnotationRepository(this.db);
    this.PersonController = new PersonController(
      this.personRepository,
      validateCep,
      getCep,
      personSchema,
      personUpdateSchema
    );
    this.annotationController = new AnnotationController(
      this.annotationRepository,
      anotationSchema,
      anotationUpdateSchema
    );
    this.routerToken = new TokenRouter(this.router, this.token);
    this.routerPerson = new PersonRouter(
      this.router,
      this.PersonController,
      this.token
    );
    this.routerAnnotation = new AnnotationRouter(
      this.router,
      this.annotationController,
      this.token
    );
    this.nameAPI = "/api_test_rogalabs/v1";
    this.config();
    this.routes()
  }

  application(){
    return this.app
  }

  config() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.nameAPI + "/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    this.app.use(this.nameAPI, this.routerToken.start());
    this.app.use(this.nameAPI, this.routerPerson.start());
    this.app.use(this.nameAPI, this.routerAnnotation.start());
    this.app.use((req, res, next) => {
        res.status(404).json({ message: "Not found" });
      });
  }

  start() {
    this.app.listen(this.app.get("port"), () =>
      console.log("Server is listenning on port", this.app.get("port"))
    );
  }
}

const server = new Server(
  pool,
  token,
  personSchema,
  personUpdateSchema,
  getCep,
  validateCep,
  anotationSchema,
  anotationUpdateSchema
);

server.start();
