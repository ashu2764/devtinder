import express from 'express';
// import { adminAuthMiddleware } from './middleware/adminAuth.middleware.js';
import { User } from './models/user.model.js';


const app = express();


app.post("/signup", async (req, res)=>{
    try {
        const userObj = {
            firstName: "Virat",
            lastName: "Kumar",
            email: "itsashu111@gmail.com",
            password: "Ashu1234",
            age: 21,
            gender:"M"
        }

        const user = await User.create(userObj);
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            user
        })  
        
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong while creating user",
            error: error.message
        })
    }
})

app.get('/getdata', async(req, res)=>{
    try {
        const user = await User.find();
        res.status(201).json({
            message: "User data fetched successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while fetching user data",
            error: error.message
        })
    }

})





export default app;
