export class AnnotationController {
  constructor(repo, anotationSchema, anotationUpdateSchema) {
    this.repo = repo;
    this.anotationSchema = anotationSchema;
    this.anotationUpdateSchema = anotationUpdateSchema;
  }

  getController = async (req, res) => {
    try {
      const [rows] = await this.repo.getAll();
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Annotation not found" });
      }

      res.status(200).json({ Anotação: rows });
    } catch (error) {
      console.log(error);
      res.status(500).json("an error occurred");
    }
  };

  getOneController = async (req, res) => {
    try {
      const { id } = req.params;
      if (id !== null) {
        const [rows] = await this.repo.getOne(id);

        if (rows.length <= 0) {
          return res.status(404).json({ message: "Annotation not found" });
        }

        res.status(200).json({ Anotação: rows });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("an error occurred");
    }
  };

  postController = async (req, res) => {
    const { error, value } = this.anotationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      if (value.description === undefined) {
        value.description = null;
      }

      try {
        await this.repo.post(value);
        return res
          .status(200)
          .json({ response: "Annotation inserted correctly" });
      } catch (error) {
        console.log(error);
        return res.status(500).json("an error occurred");
      }
    }
  };

  updateController = async (req, res) => {
    const { error, value } = this.anotationUpdateSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      const { id } = req.params;
      if (id !== "") {
        value.id = id;
      }

      try {
        const [rows] = await this.repo.update(value);
        console.log(rows);

        if (rows.affectedRows === 0) {
          return res.status(404).json({ message: "Annotation not found" });
        }

        return res
          .status(200)
          .json({ response: "Annotation inserted correctly" });
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
        const repo = await this.repo.deleteOne(id);
        if (repo[0].affectedRows === 0) {
          return res.status(404).json({ message: "Annotation not found" });
        }
        res.status(200).json({ affectedRows: repo[0].affectedRows });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("an error occurred");
    }
  };
}
