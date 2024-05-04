import express from "express";
import { connectDB } from "./db/db.js";
import { router } from "./routes/routes.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(errorHandler);

// const PORT = 5000;
const PORT = process.env.PORT

connectDB()
  .then(() => {
    // Database connection successful, start the server
    app
      .listen(PORT, "0.0.0.0", () => {
        console.log(`Server connected to port ${PORT}`);
      })
      .on("error", (err) => {
        console.error(`Error starting the server: ${err.message}`);
      });
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
  });

// TQvAs2sIIEhMzh44 password