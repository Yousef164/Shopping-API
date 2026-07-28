import usersRoute from "./users/user.route.js";
import ordersRoute from "./orders/order.route.js";
import productsRoute from "./products/product.route.js";
import verifyEmailRoute from "./verify-email/verifyEmail.route.js";

const modules = {
  users: usersRoute,
  orders: ordersRoute,
  products: productsRoute,
  verifyEmail: verifyEmailRoute,
};

export default modules;
