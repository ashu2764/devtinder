import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;

app.use("/test", (req, res)=>{
    res.send("Hello World! This is DevTinder");
})

app.get("/hello", (req, res)=>{
    res.send("Welcome to DevTinder");   
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})