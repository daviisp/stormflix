import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

export interface Category {
  // Interface com todos os campos que a gente deseja inserir manualmente. O ID é um campo de autoIncrement, mas caso a gente queria colocar um ID manualmente, será possível.
  id: number;
  name: string;
  position: number;
}

export interface CategoryCreationAttributes extends Optional<Category, "id"> {} // Estamos dizendo aqui que o campo ID é opcional para inserir ele manualmente.

export interface CategoryInstance extends Model<Category, CategoryCreationAttributes>,Category {} // Aqui estamos tipando de fato o nosso model, mas ainda não criamos o nosso Model. O nosso Model é a const "Category" abaixo, que terá a tipagem DESTA interface, que é a junção da interface Category com a interface CategoryCreationAttributes.

export const Category = sequelize.define<CategoryInstance, Category>(
  "Category",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    position: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }
); // Criação do Model na qual você já está acostumado. No Model nós colocamos os dados que queremos inserir manualmente. No caso o ID é opcional inserirmos ele manualmente, porque importamos o "Optional" que faz exatamente isso, além de fazermos interface própria para isso que o campo "ID" da interface Category da tabela "categories" seja opcional (Segunda interface que faz isso). Depois de fazermos isso, criamos a pasta "resources" com o arquivo "category.ts" onde inserimos todas as propriedades que irá aparecer no AdminJS na WEB.  Depois de fazermos isso, criamos o arquivo index.ts dentro de "resources" onde irá usar o nosso model "Category.ts" com a resource que está dentro da variável "categoryResourceOptions".
