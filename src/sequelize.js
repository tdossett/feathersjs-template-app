require('dotenv').config();

const Sequelize = require('sequelize');

module.exports = function (app) {
  const connectionString = `postgres://${process.env.PGNAME}:${process.env.PGPASS}@dostekinc.cia2kszvjdsy.us-east-2.rds.amazonaws.com:${process.env.PGPORT}/dostekinc?sslmode=verify-full sslrootcert=config/rds-combined-ca-bundle.pem`;
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true
    },
    pool: {
      max: 5,
      min: 1,
      idle: 20000,
      acquire: 20000
    }
  });
  const oldSetup = app.setup;

  /* eslint-disable no-console */
  console.log('connectionString: ', connectionString);
  /* eslint-enable no-console */

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync();
    /* eslint-disable no-console */
    sequelize.query('SELECT * from customer').then(console.log, (e) => console.error('sequelize errback', e));
    /* eslint-enable no-console */

    return result;
  };
};
