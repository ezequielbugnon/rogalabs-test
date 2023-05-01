export class PersonController {
  constructor(repo, validateCep, getCep, personSchema, personUpdateSchema) {
    this.repo = repo;
    this.validateCep = validateCep;
    this.getCep = getCep;
    this.personSchema = personSchema;
    this.personUpdateSchema = personUpdateSchema;
  }

  getController = async (req, res) => {
    try {
      const [rows] = await this.repo.getRepository();

      if (rows.length <= 0) {
        return res.status(404).json({ message: "Person not found" });
      }

      res.status(200).json({ Pessoas: rows });
    } catch (error) {
      console.log(error);
      res.status(500).json("an error occurred");
    }
  };

  postController = async (req, res) => {
    const { error, value } = this.personSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      const validateCepResponse = await this.validateCep(value.cep);
      if (!validateCepResponse) {
        return res.status(400).json({ error: "cep is invalid" });
      }

      if (value.dadName === undefined) {
        value.dadName = null;
      }

      const datObj = new Date(value.dateOfBirth);
      value.dateOfBirth =
        datObj.getFullYear() +
        "-" +
        (datObj.getMonth() + 1) +
        "-" +
        datObj.getDate();

      try {
        await this.repo.postRepository(value);
        return res.status(200).json({ response: "person inserted correctly" });
      } catch (error) {
        console.log(error);
        return res.status(500).json("an error occurred");
      }
    }
  };

  updateController = async (req, res) => {
    const { error, value } = this.personUpdateSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error });
    } else {
      if (
        value.dateOfBirth !== undefined ||
        value.dateOfBirth !== "NaN-NaN-NaN"
      ) {
        const datObj = new Date(value.dateOfBirth);
        value.dateOfBirth =
          datObj.getFullYear() +
          "-" +
          (datObj.getMonth() + 1) +
          "-" +
          datObj.getDate();
      }
      if (
        value.dateOfBirth === undefined ||
        value.dateOfBirth === "NaN-NaN-NaN"
      ) {
        value.dateOfBirth = null;
      }

      const { id } = req.params;
      if (id !== "") {
        value.id = id;
      }

      if (value.cep !== undefined || value.cep !== null) {
        const validateCepResponse = await this.validateCep(value.cep);
        if (!validateCepResponse) {
          return res.status(400).json({ error: "cep is invalid" });
        }
      }

      try {
        const repo = await this.repo.updateRepository(value);
        if (repo[0].affectedRows === 0) {
          return res.status(404).json({ message: "Person not found" });
        }

        return res.status(200).json({ response: "person updated correctly" });
      } catch (error) {
        console.log(error);
        return res.status(500).json("an error occurred");
      }
    }
  };

  deleteController = async (req, res) => {
    try {
      const { id } = req.params;
      if (id !== null) {
        const repo = await this.repo.deleteRepository(id);
        if (repo[0].affectedRows === 0) {
          return res.status(404).json({ message: "Person not found" });
        }
        res.status(200).json({ affectedRows: repo[0].affectedRows });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("an error occurred");
    }
  };

  getOneController = async (req, res) => {
    try {
      const { id } = req.params;
      if (id !== null) {
        const [rows] = await this.repo.getOneRepository(id);

        if (rows.length <= 0) {
          return res.status(404).json({ message: "Person not found" });
        }
        const dataCep = await this.getCep(rows[0].cep);

        res.status(200).json({ ...rows[0], ...dataCep.data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("an error occurred");
    }
  };
}
