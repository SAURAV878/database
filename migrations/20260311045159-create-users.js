

/** @type {import('sequelize-cli').Migration} */

  export const up = async  (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      } ,
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  };

  export const down = async  (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
