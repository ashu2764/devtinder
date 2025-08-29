import express from 'express';
import { adminAuthMiddleware } from './middleware/adminAuth.middleware.js';
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/admin', adminAuthMiddleware);

// app.use("/test", (req, res)=>{
//     res.send("Hello World! This is DevTinder");
// })

app.get('/admin/login', (req, res)=>{
    try {

        console.log("Admin login route accessed");
         res.send("Admin Login Successful");
        
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).send("Internal Server Error");
    }
   
})

app.get("/hello", (req, res)=>{
    res.send("Welcome to DevTinder");   
})

app.use('/', (err, req,res,next) =>{
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})