'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerSummaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CustomerSummaries.belongsTo(models.Seasons, {
        foreignKey: 'seasonID',
        as: 'season',
        onDelete: 'CASCADE',
      });
  
      CustomerSummaries.belongsTo(models.Customers, {
        foreignKey: 'customerID',
        as: 'customer',
        onDelete: 'CASCADE',
      });
    }
  };
  CustomerSummaries.init({
    customerID: DataTypes.INTEGER,
    seasonID: DataTypes.INTEGER,
    totalRepaid: DataTypes.DECIMAL ,
    totalCredit: DataTypes.DECIMAL 
  }, {
    sequelize,
    modelName: 'CustomerSummaries',
  });
  return CustomerSummaries;
};