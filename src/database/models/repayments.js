'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repayments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Repayments.belongsTo(models.Seasons, {
      foreignKey: 'seasonID',
      as: 'season',
      onDelete: 'CASCADE',
      });

      Repayments.belongsTo(models.Customers, {
      foreignKey: 'customerID',
      as: 'customer',
      onDelete: 'CASCADE',
      });
  
    }
  };
  Repayments.init({
    customerID: DataTypes.INTEGER,
    seasonID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    amount: DataTypes.DECIMAL,
    parentID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Repayments',
  });
  return Repayments;
};