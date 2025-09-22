const db = require('./database');
const bcrypt = require('bcryptjs');

const Usuario = {
  getAll: (callback) => {
    const sql = 'SELECT usuario_id, nombre, apellido, nombre_usuario, tipo_usuario, celular, foto, creado, modificado, activo FROM usuarios WHERE activo = 1';
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT usuario_id, nombre, apellido, nombre_usuario, tipo_usuario, celular, foto, creado, modificado, activo FROM usuarios WHERE usuario_id = ? AND activo = 1';
    db.query(sql, [id], callback);
  },

  getByUsername: (nombre_usuario, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE nombre_usuario = ? AND activo = 1';
    db.query(sql, [nombre_usuario], callback);
  },

  create: (data, callback) => {
    const hashedPassword = bcrypt.hashSync(data.contrasenia, 8);
    const sql = `INSERT INTO usuarios 
      (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, creado, modificado, activo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 1)`;
    const { nombre, apellido, nombre_usuario, tipo_usuario, celular, foto } = data;
    db.query(sql, [nombre, apellido, nombre_usuario, hashedPassword, tipo_usuario, celular, foto], callback);
  },

  update: (id, data, callback) => {
    let sql, params;
    if (data.contrasenia) {
      const hashedPassword = bcrypt.hashSync(data.contrasenia, 8);
      sql = `UPDATE usuarios SET nombre = ?, apellido = ?, nombre_usuario = ?, contrasenia = ?, 
        tipo_usuario = ?, celular = ?, foto = ?, modificado = NOW() WHERE usuario_id = ? AND activo = 1`;
      params = [data.nombre, data.apellido, data.nombre_usuario, hashedPassword, data.tipo_usuario, data.celular, data.foto, id];
    } else {
      sql = `UPDATE usuarios SET nombre = ?, apellido = ?, nombre_usuario = ?, tipo_usuario = ?, 
        celular = ?, foto = ?, modificado = NOW() WHERE usuario_id = ? AND activo = 1`;
      params = [data.nombre, data.apellido, data.nombre_usuario, data.tipo_usuario, data.celular, data.foto, id];
    }
    db.query(sql, params, callback);
  },

  delete: (id, callback) => {
    const sql = 'UPDATE usuarios SET activo = 0, modificado = NOW() WHERE usuario_id = ? AND activo = 1';
    db.query(sql, [id], callback);
  }
};

module.exports = Usuario;