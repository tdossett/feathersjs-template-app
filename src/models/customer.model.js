// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const customer = sequelizeClient.define('customer', {
    customerId: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
    },
    firstName: {
      type: DataTypes.TEXT,
    },
    lastName: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.TEXT,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  customer.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  // customer.removeAttribute('customer.id');

  return customer;
};
