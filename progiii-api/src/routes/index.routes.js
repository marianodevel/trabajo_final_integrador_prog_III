const { Router } = require('express');
const router = Router();

// Ruta temporal de prueba
router.get('/test', (req, res) => {
  res.json({ ok: true, message: 'Rutas funcionando' });
});

// Aquí se agregarán las rutas: salones, reservas, usuarios, etc.
// Ejemplo futuro:
// router.use('/salones', salonRoutes);

module.exports = router;
