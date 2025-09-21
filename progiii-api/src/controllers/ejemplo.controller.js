const ejemploController = {
  obtenerDatos: (req, res) => {
    res.json({ mensaje: 'Controlador de ejemplo funcionando' });
  },
};

module.exports = ejemploController;
