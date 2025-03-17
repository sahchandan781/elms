import express from 'express'
import dotenv from 'dotenv/config';
import connectDB from './database/db.js';

const app = express();

const PORT = process.env.port || 8081;
connectDB();
app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
    
})