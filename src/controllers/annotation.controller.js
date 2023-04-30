import {getAll, getOne, post, update, deleteOne} from '../repository/annotation.repository.js';
import { anotationSchema, anotationUpdateSchema } from '../validators/annotation.js';

export const getController = async (req, res) => {
    try {
      const [rows] = await getAll();
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Anotação not found" });
      }
  
      res.status(200).json({ Anotação: rows });
    } catch (error) {
      console.log(error);
      res.status(500).json("an error occurred");
    }
};

export const getOneController = async (req, res) => {
  try {
    const {id} = req.params;
    if(id !== null){
      const [rows] = await getOne(id);

      if (rows.length <= 0) {
        return res.status(404).json({ message: "Anotação not found" });
      }

    res.status(200).json({ Anotação: rows });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("an error occurred");
  }
};

export const postController = async (req, res) => {
  const { error, value } = anotationSchema.validate(req.body);


  if (error) {
    return res.status(400).json({ error: error.details[0].message});
  } else {

    if (value.description === undefined) {
      value.description = null;
    }

    try {
      await post(value);
      return res.status(200).json({ response: "Anotação inserted correctly" });
    } catch (error) {
      console.log(error);
      return res.status(500).json("an error occurred");
    }
  }
};

export const updateController = async (req, res) => {
  const { error, value } = anotationUpdateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message});
  } else {
    const { id } = req.params;
    if (id !== "") {
      value.id = id;
    }

    try {
      const [rows] = await update(value);
      console.log(rows)

      if (rows.affectedRows === 0) {
        return res.status(404).json({ message: "Anotação not found" });
      }

      return res.status(200).json({ response: "Anotação inserted correctly" });
    } catch (error) {
      console.log(error);
      return res.status(500).json("an error occurred");
    }
  }
};

export const deleteController = async (req, res) => {
  try {
    const {id} = req.params;
    if(id !== null){
      const repo = await deleteOne(id);
      if (repo[0].affectedRows === 0){
        return res.status(404).json({ message: "Anotação not found" });
      }
      res.status(200).json({ affectedRows: repo[0].affectedRows });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json("an error occurred");
  }
};