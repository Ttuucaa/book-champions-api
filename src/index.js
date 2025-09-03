import express from "express";
import { port } from "./config.js";
import bookRoutes from "./routes/books.routes.js";
import { sequelize } from "./db.js";
import { Book } from "./models/Book.js";

const app = express();

app.use(express.json()); // <-- importante para leer JSON

try {
  await sequelize.sync(); // <-- primero sincroniza la base de datos
  app.use(express.json()); // <-- middleware para parsear JSON
  app.use("/books", bookRoutes); // <-- usa prefijo
  app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
  });
} catch (error) {
  console.log("Hubo un error en la inicializacion");
}