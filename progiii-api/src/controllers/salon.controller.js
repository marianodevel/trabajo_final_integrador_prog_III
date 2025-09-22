const Salon = require("../models/salon.model");

// B - Browse: Listar todos los salones activos
const getAllSalones = (req, res) => {
  Salon.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener salones" });
    }
    res.json(results);
  });
};

// R - Read: Obtener un salón por ID
const getSalonById = (req, res) => {
  const id = req.params.id;
  Salon.getById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener el salón" });
    }
    if (!result) {
      return res.status(404).json({ error: "Salón no encontrado" });
    }
    res.json(result);
  });
};

// E - Edit: Actualizar un salón
const updateSalon = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Salon.update(id, data, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar el salón" });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Salón no encontrado o ya eliminado" });
    }
    res.json({ message: "Salón actualizado correctamente" });
  });
};

// A - Add: Crear un nuevo salón
const createSalon = (req, res) => {
  const data = req.body;

  Salon.create(data, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al crear el salón" });
    }
    res.status(201).json({
      message: "Salón creado correctamente",
      salon_id: result.insertId,
    });
  });
};

// D - Delete: Eliminar (soft delete) un salón
const deleteSalon = (req, res) => {
  const id = req.params.id;

  Salon.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al eliminar el salón" });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Salón no encontrado o ya eliminado" });
    }
    res.json({ message: "Salón eliminado (soft delete) correctamente" });
  });
};

module.exports = {
  getAllSalones,
  getSalonById,
  updateSalon,
  createSalon,
  deleteSalon,
};
