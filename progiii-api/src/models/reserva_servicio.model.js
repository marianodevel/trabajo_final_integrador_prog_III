const db = require('./database');

const ReservaServicio = {
  getByReservaId: (reserva_id, callback) => {
    const sql = `SELECT rs.*, ser.descripcion, ser.importe as precio_unitario 
                 FROM reservas_servicios rs
                 JOIN servicios ser ON rs.servicio_id = ser.servicio_id
                 WHERE rs.reserva_id = ? AND rs.activo = 1`;
    db.query(sql, [reserva_id], callback);
  },

  addServiceToReserva: (reserva_id, servicio_id, importe, callback) => {
    const sql = `INSERT INTO reservas_servicios (reserva_id, servicio_id, importe, creado, modificado, activo) 
                 VALUES (?, ?, ?, NOW(), NOW(), 1)`;
    db.query(sql, [reserva_id, servicio_id, importe], callback);
  },

  removeServiceFromReserva: (reserva_id, servicio_id, callback) => {
    const sql = 'UPDATE reservas_servicios SET activo = 0, modificado = NOW() WHERE reserva_id = ? AND servicio_id = ? AND activo = 1';
    db.query(sql, [reserva_id, servicio_id], callback);
  }
};

module.exports = ReservaServicio;