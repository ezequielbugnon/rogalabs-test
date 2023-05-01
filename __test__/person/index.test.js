import request from "supertest";
import { Server } from "../../src/server";
import { pool } from "../../src/db/db.js";
import token from "../../src/jwt/index.js";
import { validateCep } from "../../src/utils/validateCep.js";
import { getCep } from "../../src/utils/getCep.js";
import {
  personSchema,
  personUpdateSchema,
} from "../../src/validators/person.js";
import {
  anotationSchema,
  anotationUpdateSchema,
} from "../../src/validators/annotation.js";

const app = new Server(
  pool,
  token,
  personSchema,
  personUpdateSchema,
  getCep,
  validateCep,
  anotationSchema,
  anotationUpdateSchema
);

test("getAll should respond a 401 without token provided", async () => {
  const res = await request(app.application()).get(
    "/api_test_rogalabs/v1/pessoa"
  );
  expect(res.statusCode).toEqual(401);
});

test("GetAll should respond a 200", async () => {
  const tk = await request(app.application()).get(
    "/api_test_rogalabs/v1/token/dardo"
  );

  const res = await request(app.application())
    .get("/api_test_rogalabs/v1/pessoa")
    .set("Authorization", tk.body.token);

  expect(res.statusCode).toEqual(200);
});

test("Post should respond a 400 because cep is invalid", async () => {
  const tk = await request(app.application()).get(
    "/api_test_rogalabs/v1/token/dardo"
  );

  const res = await request(app.application())
    .post("/api_test_rogalabs/v1/pessoa")
    .send({
      name: "John Doe",
      momName: "Marta",
      cep: "59178002",
      dateOfBirth: "1992-12-12",
    })
    .set("Authorization", tk.body.token);

  expect(res.statusCode).toEqual(400);
});

test("Post should respond a 200", async () => {
  const tk = await request(app.application()).get(
    "/api_test_rogalabs/v1/token/dardo"
  );

  const res = await request(app.application())
    .post("/api_test_rogalabs/v1/pessoa")
    .send({
      name: "John Doe",
      momName: "Marta",
      cep: "59178000",
      dateOfBirth: "1992-12-12",
    })
    .set("Authorization", tk.body.token);

  expect(res.statusCode).toEqual(200);
});

test("Update should respond a 404", async () => {
  const tk = await request(app.application()).get(
    "/api_test_rogalabs/v1/token/dardo"
  );

  const res = await request(app.application())
    .patch("/api_test_rogalabs/v1/pessoa/2000000000000")
    .send({
      name: "John Doe",
      momName: "Marta",
    })
    .set("Authorization", tk.body.token);

  expect(res.statusCode).toEqual(404);
});

test("Delete should respond a 404", async () => {
  const tk = await request(app.application()).get(
    "/api_test_rogalabs/v1/token/dardo"
  );

  const res = await request(app.application())
    .delete("/api_test_rogalabs/v1/pessoa/2000000000000")
    .set("Authorization", tk.body.token);

  expect(res.statusCode).toEqual(404);
});
