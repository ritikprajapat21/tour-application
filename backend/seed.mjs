import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Tour from "./models/Tour.js";

dotenv.config();

const data = JSON.parse(fs.readFileSync("./data.json"), "utf-8");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    authSource: "admin",
    user: "root",
    pass: "password",
  })
  .then(() => {
    console.log("connected to db");

    return Tour.insertMany(data);
  })
  .then(() => {
    console.log("Data inserted successfully");
    process.exit();
  })
  .catch((err) => {
    console.log("Error:", err);
    process.exit(1);
  });
