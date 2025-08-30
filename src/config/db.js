import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


export const connectDB = async(MONGO_URI)=>{
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
}