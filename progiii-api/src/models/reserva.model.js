const db = require('./database');

const Reserva = {
  getAll: (callback) => {
    const sql = `SELECT r.*, u.nombre, u.apellido, s.titulo as salon, t.hora_desde, t.hora_hasta 
                 FROM reservas r
                 JOIN usuarios u ON r.usuario_id = u.usuario_id
                 JOIN salones s ON r.salon_id = s.salon_id
                 JOIN turnos t ON r.turno_id = t.turno_id
                 WHERE r.activo = 1`;
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `SELECT r.*, u.nombre, u.apellido, s.titulo as salon, t.hora_desde, t.hora_hasta 
                 FROM reservas r
                 JOIN usuarios u ON r.usuario_id = u.usuario_id
                 JOIN salones s ON r.salon_id = s.salon_id
                 JOIN turnos t ON r.turno_id = t.turno_id
                 WHERE r.reserva_id = ? AND r.activo = 1`;
    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = `INSERT INTO reservas 
      (fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total, creado, modificado, activo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 1)`;
    const { fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total } = data;
    db.query(sql, [fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total], callback);
  },

  update: (id, data, callback) => {
    const sql = `UPDATE reservas SET 
      fecha_reserva = ?, salon_id = ?, usuario_id = ?, turno_id = ?, foto_cumpleaniero = ?, tematica = ?, 
      importe_salon = ?, importe_total = ?, modificado = NOW() 
      WHERE reserva_id = ? AND activo = 1`;
    const { fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total } = data;
    db.query(sql, [fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'UPDATE reservas SET activo = 0, modificado = NOW() WHERE reserva_id = ? AND activo = 1';
    db.query(sql, [id], callback);
  }
};

module.exports = Reserva;