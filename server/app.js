import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import itemRouter from "./routes/item-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(bodyParser.json({ limit: '10mb' })); // Limit JSON request size
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Limit URL-encoded request size

// Routes
app.use("/api/user", router);
app.use("/api/item", itemRouter);

const PORT = process.env.PORT || 9000;

mongoose
  .connect("mongodb+srv://azhar:Mongodb%406715@ambcluster.prfsnii.mongodb.net/ETrackerr", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected To Database and listening at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
