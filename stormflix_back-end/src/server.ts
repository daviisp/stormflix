require("dotenv").config();

import express from "express";
import { sequelize } from "./database";
import { router } from "./routes";
import { adminJs, adminJsRouter } from "./adminjs";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use(router);

app.use(adminJs.options.rootPath, adminJsRouter); // A rota em si está dentro da variável adminJs. Porém a variável que usa mesmo ela é a "adminJsRouter". Por isso temos que passar tanto o adminJs quanto o adminJsRouter.

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB connection successfully!");
  });
  console.log(`Server started successfully at port ${PORT}`);
});

// .then = caso o método authenticate ocorrer tudo certo, ele irá exibir o primeiro console.log (graças ao .then()). Caso quiséssemos fazer uma tratativa de erro, poderíamos usar o .catch. Não é necessário.

process.on("uncaughtException", (err) => {
  console.log(err);
});
