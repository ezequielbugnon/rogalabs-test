import { pool } from "../db/db.js";

export const getAll = async () => {
  return await pool.query("SELECT  * FROM Pessoa p inner JOIN Anotação a ON(a.id_pessoa = p.id)");
};

export const getOne = async (id) => {
    return await pool.query("SELECT  * FROM Pessoa p inner JOIN Anotação a ON(a.id_pessoa = p.id) where a.id = ?", [id]);
  };
  
export const update = async (data) => {
    const datetime = new Date();
    return await pool.query(
      "UPDATE Anotação SET titulo = IFNULL(?, titulo), descricao = IFNULL(?, descricao), data_edicao = ? WHERE id = ?",
      [data.titulo, data.descricao ,datetime, data.id]
    );
};

export const post = async (data) => {
    const datetime = new Date();
    return await pool.query(
        "INSERT INTO Anotação(id, id_pessoa, titulo, descricao, data_cadastro, data_edicao ) VALUES(?,?,?,?,?,?) ",
      [null, data.idPessoa, data.titulo, data.descricao ,datetime,null]
    );
};

export const deleteOne = async (id) => {
    return await pool.query(`DELETE FROM Anotação WHERE id = ?`, [id]);
};

  