import express from 'express';
// import { adminAuthMiddleware } from './middleware/adminAuth.middleware.js';
import { User } from './models/user.model.js';


const app = express();
app.use(express.json())

app.post("/signup", async (req, res) => {
    try {
        // const user = await User.create(userObj);
        const user = new User(req.body)
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

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json({
            message: "Users  fetched successfully",
            users
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while fetching users",
            error: error.message
        })
    }

})

app.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        res.status(201).json({ message: "User fetched sucessfully", user })
    } catch (error) {
        console.log("error while updating user", error);
        res.status(500).json({ message: "Something went wrong while fetching  user", error: error.message })
    }
})

app.put("/user/:id", async (req, res) => {
    try {
        const AllowedUpdates = ["firstName", "lastName", "password", "age", "skills", "photoUrl"];
        const requestedUpdates = Object.keys(req.body);
        const isValidOperation = requestedUpdates.every((update) => AllowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).json({ message: "Invalid updates! Please update only allowed fields" })
        }
        const id = req.params.id;
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json({ message: "User updated Successfully", updateUser })
    } catch (error) {
        console.log("Something went wrong while updating the User", error)
        res.status(501).json({ message: "Error while Updating the User " })
    }
})

app.delete("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(201).json({ message: "User deleted Successfully" })
    } catch (error) {
        console.log("Something went wrong while deleting the user", error)
        res.status(501).json({ message: "Error while deleting the user" })
    }
})





export default app;
