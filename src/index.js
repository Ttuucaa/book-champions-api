import express from "express";
import { port } from "./config.js";
import bookRoutes from "./routes/books.routes.js";
import { sequelize } from "./db.js";
import { Book } from "./models/Book.js";
import cors from "cors";

const app = express();

app.use(cors()); // <-- habilita CORS para todas las rutas
app.use(express.json()); // <-- importante para leer JSON

try {
  await sequelize.sync(); // <-- primero sincroniza la base de datos
  app.use(express.json());
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  }); 
  app.use("/books", bookRoutes); // <-- usa prefijo
  app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
  });
} catch (error) {
  console.log("Hubo un error en la inicializacion");
}