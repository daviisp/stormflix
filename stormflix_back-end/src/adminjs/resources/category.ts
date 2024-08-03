import { ResourceOptions } from "adminjs";

export const categoryResourceOptions: ResourceOptions = {
  navigation: "Catálogo",
  editProperties: ["name", "position"],
  filterProperties: ["name", "position", "createdAt", "updatedAt"],
  listProperties: ["id", "name", "position"], // Info gerais
  showProperties: ["id", "name", "position", "createdAt", "updatedAt"], // Infos que irão aparecer quando você clicar em "detalhes"
};
// Depois de fazermos isso, criamos o arquivo index.ts dentro de "resources" onde irá usar o nosso model "Category.ts" com a resource que está dentro da variável "categoryResourceOptions" a desse arquivo aqui.
