var express = require("express");
var logger = require("morgan");
const path = require("path");
const cors = require("cors");

const { port } = require("./src/config/env");
const connectDB = require("./src/config/db_connection");

const errorHandler = require("./src/middlewares/errorHandler")
const routes = require("./src/routes");

connectDB();
const app = express();



app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "/src/productImages")));


app.use("/users", routes.user);
app.use("/orders", routes.order);
app.use("/products", routes.product);
app.use("/verify-email", routes.verifyEmail);

app.use(errorHandler)

app.listen(port, () => console.log(`litsen in port ${port}`));
