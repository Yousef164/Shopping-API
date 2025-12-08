const routes = {};

routes.order = require('./order.route');
routes.product = require('./product.route');
routes.user = require('./user.route');
routes.verifyEmail = require('./verifyEmail.route');

module.exports = routes;