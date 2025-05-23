import express from 'express'
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import userRoute from "./routes/user.route.js"
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js";
import coursePurchaseRoute from "./routes/purchaseCourse.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"

dotenv.config();


const app = express();

const port = process.env.PORT || 3000;
connectDB();

// Default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
    
})

// apis
app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/users", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", coursePurchaseRoute)
app.use("/api/v1/progress", courseProgressRoute);

