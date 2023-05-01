export class AnnotationRepository {
  constructor(db) {
    this.db = db;
  }

  deleteOne = async (id) => {
    return await this.db.query(`DELETE FROM Anotação WHERE id = ?`, [id]);
  };

  getAll = async () => {
    return await this.db.query(
      "SELECT  * FROM Pessoa p inner JOIN Anotação a ON(a.id_pessoa = p.id)"
    );
  };

  post = async (data) => {
    const datetime = new Date();
    return await this.db.query(
      "INSERT INTO Anotação(id, id_pessoa, titulo, descricao, data_cadastro, data_edicao ) VALUES(?,?,?,?,?,?) ",
      [null, data.idPessoa, data.titulo, data.descricao, datetime, null]
    );
  };

  update = async (data) => {
    const datetime = new Date();
    return await this.db.query(
      "UPDATE Anotação SET titulo = IFNULL(?, titulo), descricao = IFNULL(?, descricao), data_edicao = ? WHERE id = ?",
      [data.titulo, data.descricao, datetime, data.id]
    );
  };

  getOne = async (id) => {
    return await this.db.query(
      "SELECT  * FROM Pessoa p inner JOIN Anotação a ON(a.id_pessoa = p.id) where a.id = ?",
      [id]
    );
  };
}
