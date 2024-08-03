require("dotenv").config();

module.exports = {
  development: {
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    database: process.env.DATABASE,
    username: "postgres",
    password: process.env.PASSWORD,
  },
};

// Sequelize-cli é aquele comando que a gente usa pra criar o banco de dados, rodar migrations e etc. Pro sequelize-cli rodar as migrations, ele precisa saber o nome do banco de dados que ele irá precisar saber para rodar as migrations. Mas a conexão da nossa aplicação ainda não foi feita. Não existe nada em comum da conexão com a nossa aplicação com o banco de dados nesse arquivo. Rodar migrations, criar o banco de dados tudo se utiliza iniciando o comando com "sequelize-cli".

// "sequelize-cli" é uma coisa, "sequelize" é outra.
