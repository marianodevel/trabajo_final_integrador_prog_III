const db = require('./database');

const Turno = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM turnos WHERE activo = 1 ORDER BY orden';
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT * FROM turnos WHERE turno_id = ? AND activo = 1';
    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = `INSERT INTO turnos (orden, hora_desde, hora_hasta, creado, modificado, activo) 
      VALUES (?, ?, ?, NOW(), NOW(), 1)`;
    db.query(sql, [data.orden, data.hora_desde, data.hora_hasta], callback);
  },

  update: (id, data, callback) => {
    const sql = `UPDATE turnos SET orden = ?, hora_desde = ?, hora_hasta = ?, modificado = NOW() 
      WHERE turno_id = ? AND activo = 1`;
    db.query(sql, [data.orden, data.hora_desde, data.hora_hasta, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'UPDATE turnos SET activo = 0, modificado = NOW() WHERE turno_id = ? AND activo = 1';
    db.query(sql, [id], callback);
  }
};

module.exports = Turno;