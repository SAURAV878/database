

/** @type {import('sequelize-cli').Migration} */
  export const up = async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('admin',  'user'),
      defaultValue: 'user',
      allowNull: false
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  };

  export const down = async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }

