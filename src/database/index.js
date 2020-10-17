import Sequelize from 'sequelize';

import Parlamentar from '../app/models/Parlamentar';

import databaseConfig from '../config/database';

const models = [Parlamentar];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
