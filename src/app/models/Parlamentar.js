import Sequelize, { Model } from 'sequelize';

class Parlamentar extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        document: Sequelize.STRING,
        avatar_url: Sequelize.STRING,
        has_suspicions: Sequelize.BOOLEAN
      },
      {
        sequelize,
      }
    );

    return this;
  }

}

export default Parlamentar;
