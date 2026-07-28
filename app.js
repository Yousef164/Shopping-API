import express from "express";
import logger from "morgan";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

import { port } from "./src/config/env.js";
import connectDB from "./src/config/db_connection.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import modules from "./src/modules/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "/src/productImages")));

app.use("/users", modules.users);
app.use("/orders", modules.orders);
app.use("/products", modules.products);
app.use("/verify-email", modules.verifyEmail);

app.use(errorHandler);

app.listen(port, () => console.log(`litsen in port ${port}`));
