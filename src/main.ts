import cors from "cors";
import express from "express";
import http from "http";
import logger from "./config/logger";
import setting from "./config/settings";

// Incio de la app
const app = express();
const server = http.createServer(app);

// Configuración y middlewares globales
app.use(cors());
app.use(express.json());

app.use("/", (_req, res) => {
  res.send("Hola");
});

// Inicio del servidor
server.listen(setting.PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${setting.PORT || 3001}`);
});

// Middleware de manejo de errores
app.use((err: any, _req, res: any) => {
  console.error(err.message);
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
