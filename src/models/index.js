const db = {};

db.User = require("./schema/user");
db.Product = require("./schema/product");
db.Order = require("./schema/order");

module.exports = db;
