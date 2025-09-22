const db = require('./database');

const Salon = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM salones WHERE activo = 1';
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT * FROM salones WHERE salon_id = ? AND activo = 1';
    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = `INSERT INTO salones 
      (titulo, direccion, latitud, longitud, capacidad, importe, creado, modificado, activo) 
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), 1)`;
    const { titulo, direccion, latitud, longitud, capacidad, importe } = data;
    db.query(sql, [titulo, direccion, latitud, longitud, capacidad, importe], callback);
  },

  update: (id, data, callback) => {
    const sql = `UPDATE salones SET 
      titulo = ?, direccion = ?, latitud = ?, longitud = ?, capacidad = ?, importe = ?, modificado = NOW() 
      WHERE salon_id = ? AND activo = 1`;
    const { titulo, direccion, latitud, longitud, capacidad, importe } = data;
    db.query(sql, [titulo, direccion, latitud, longitud, capacidad, importe, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'UPDATE salones SET activo = 0, modificado = NOW() WHERE salon_id = ? AND activo = 1';
    db.query(sql, [id], callback);
  }
};

module.exports = Salon;