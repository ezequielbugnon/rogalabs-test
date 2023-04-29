import { pool } from "../db/db.js";

export const getRepository = async () => {
  return await pool.query("SELECT * FROM Pessoa");
};

export const postRepository = async (data) => {
  const datetime = new Date();
  return await pool.query(
    "INSERT INTO Pessoa(id, nome, nome_mae, nome_pai, cep, data_nascimento, data_cadastro, data_edicao ) VALUES(?,?,?,?,?,?,?,?) ",
    [
      null,
      data.name,
      data.momName,
      data.dadName,
      data.cep,
      data.dateOfBirth,
      datetime,
      null,
    ]
  );
};

export const updateRepository = async (data) => {
  const datetime = new Date();
  return await pool.query(
    "UPDATE Pessoa SET nome = IFNULL(?, nome), nome_mae = IFNULL(?, nome_mae), nome_pai = IFNULL(?, nome_pai), cep = IFNULL(?, cep),  data_nascimento = IFNULL(?, data_nascimento), data_edicao = ? WHERE id = ?",
    [data.name, data.momName, data.dadName, data.cep, data.dateOfBirth,datetime, data.id]
  );
};

export const deleteRepository = async (id) => {
  return await pool.query(`DELETE FROM Pessoa WHERE id = ?`, [id]);
};

export const getOneRepository = async (id) => {
  return await pool.query(`SELECT * FROM Pessoa WHERE id = ?`, [id]);
};



  
