"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("likes", {
      user_id: {
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        type: Sequelize.DataTypes.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      course_id: {
        allowNull: false,
        primaryKey: true,
        references: { model: "courses", key: "id" },
        type: Sequelize.DataTypes.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("likes");
  },
};
