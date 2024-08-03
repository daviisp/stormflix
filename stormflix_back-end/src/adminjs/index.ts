import AdminJS from "adminjs"; // Import AdminJS

import AdminJSExpress from "@adminjs/express"; // Fazer rotas no AdminJS pelo Express

import AdminJSSequelize from "@adminjs/sequelize"; // Fazer o AdminJS entender que o "ORM", que o que você conhece até agora é o Mongoose e o Sequelize que iremos usar é o "Sequelize".

import { sequelize } from "../database"; // Import do nosso banco de dados
import { adminJsResources } from "./resources";
import { Category, Course, Episode, User } from "../models";
import bcrypt from "bcrypt";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationsOptions } from "./authentication";

AdminJS.registerAdapter(AdminJSSequelize); // AdminJS entender para adaptar ele ao Sequelize.

export const adminJs = new AdminJS({
  databases: [sequelize], // Aqui é um array pois poderíamos ter mais de um banco de dados.
  rootPath: "/admin", // Rota para acessar o AdminJS.
  resources: adminJsResources,
  branding: brandingOptions,
  locale: locale,
  dashboard: dashboardOptions,
});

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationsOptions,
  null,
  {
    resave: false,
    saveUnitialized: false,
  }
); // Lembra que o Express é o responsável pelas rotas? No MongoDB também é assim, então aqui segue essa mesma ideia. Então para usarmos as rotas, temos que usar o AdminJSExpress, e essas rotas estão dentro da variável "adminJs".
