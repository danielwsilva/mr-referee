module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Up Parlamentars Table
     */
    await queryInterface.createTable('parlamentars', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      document:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      party: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estate: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      avatar_url:{
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      has_suspicions: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('parlamentars')
    /**
     * Down Parlamentars Table
     */
  }
};
