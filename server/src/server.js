import pkg from "mongoose";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import pg from "pg";
import cors from "cors";
const { connect } = pkg;

import app from "./app.js";

const PORT = process.env.PORT || 5000;
dotenv.config();
const url = process.env.MONGODB_URI;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.get("/quacks", async (req, res) => {
      try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({}).toArray();
        res.json(socks);
      } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
      }
    });
    app.post("/quacks/login", async (req, res) => {
      const { username, password } = req.body;
      try {
        const result = await pool.query(
          "SELECT uid FROM users WHERE username = $1 AND password = $2",
          [username, password]
        );
        if (result.rows.length > 0) {
          res.status(200).json({ uid: result.rows[0].uid });
        } else {
          res.status(401).json({ message: "Authentication failed" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
