// Modules
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import connectDatabase from "./config/db.js";

// Route files
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";

//configure env
dotenv.config();

//databse config
connectDatabase();

// Cors options
const corsOptions = {
  origin: ['http://192.168.1.180:3000', 'http://localhost:3000', process.env.FRONTEND_URI],
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

//middelwares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("Successful request. Try /api/v1/product for products page.");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
