import express from "express";
import dbConnect from "./config/db";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import noteRoutes from './routes/noteRoutes';
import cors from "cors";
import helmet from 'helmet';


import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use(cors())

//routes
app.use("/api/users", userRoutes);
app.use('/api', noteRoutes);
app.use(errorHandler);


dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err: any) => {
    console.error("Failed to connect to the database", err);
    // Here you could log the error and decide what to do next
    // e.g., retry the connection, alert the necessary parties, etc.
  });
