import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"//cross origin resource sharing allows backend to communicate with frontend and for resource sharing

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRoutes);
app.listen(5000, () => {
    console.log("Server is running");
});

