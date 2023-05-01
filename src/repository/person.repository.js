export class PersonRepository {
  constructor(db) {
    this.db = db;
  }

  getOneRepository = async (id) => {
    return await this.db.query(`SELECT * FROM Pessoa WHERE id = ?`, [id]);
  };

  deleteRepository = async (id) => {
    return await this.db.query(`DELETE FROM Pessoa WHERE id = ?`, [id]);
  };

  updateRepository = async (data) => {
    const datetime = new Date();
    return await this.db.query(
      "UPDATE Pessoa SET nome = IFNULL(?, nome), nome_mae = IFNULL(?, nome_mae), nome_pai = IFNULL(?, nome_pai), cep = IFNULL(?, cep),  data_nascimento = IFNULL(?, data_nascimento), data_edicao = ? WHERE id = ?",
      [
        data.name,
        data.momName,
        data.dadName,
        data.cep,
        data.dateOfBirth,
        datetime,
        data.id,
      ]
    );
  };

  postRepository = async (data) => {
    const datetime = new Date();
  
    return await this.db.query(
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

  getRepository = async () => {
    return await this.db.query("SELECT * FROM Pessoa");
  };
}
