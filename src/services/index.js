const customer = require('./customer/customer.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(customer);
};
