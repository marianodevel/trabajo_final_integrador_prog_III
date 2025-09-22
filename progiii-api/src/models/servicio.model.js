const db = require('./database');

const Servicio = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM servicios WHERE activo = 1';
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT * FROM servicios WHERE servicio_id = ? AND activo = 1';
    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = `INSERT INTO servicios (descripcion, importe, creado, modificado, activo) 
      VALUES (?, ?, NOW(), NOW(), 1)`;
    db.query(sql, [data.descripcion, data.importe], callback);
  },

  update: (id, data, callback) => {
    const sql = `UPDATE servicios SET descripcion = ?, importe = ?, modificado = NOW() 
      WHERE servicio_id = ? AND activo = 1`;
    db.query(sql, [data.descripcion, data.importe, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'UPDATE servicios SET activo = 0, modificado = NOW() WHERE servicio_id = ? AND activo = 1';
    db.query(sql, [id], callback);
  }
};

module.exports = Servicio;