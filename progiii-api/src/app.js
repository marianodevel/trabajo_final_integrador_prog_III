const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Importar conexión a DB
const db = require("./models/database");

// Inicializar Express
const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", require("./routes/index.routes"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API REST - PROGIII Gestión de Reservas" });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = app;
