// Core Imports
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Route and Model Imports
const Blogs = require('./model/blog');
const Users = require("./model/user");
const isLogin = require('./middleware/isLogin');

// App Initialization
const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key-for-lec23'; // Should be the same as in isLogin.js

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- ROUTES ---

// BLOG ROUTES
app.post("/blogs", isLogin, async (req, res) => {
    let { title, body } = req.body;
    let userId = req.userId; // Get userId from the isLogin middleware

    let userExist = await Users.findById(userId);
    if (userExist) {
        let newBlog = new Blogs({
            title: title,
            body: body,
            date: Date.now(),
            userId: userId
        });
        await newBlog.save();
        userExist.blogs.push(newBlog._id);
        await userExist.save();
        res.json({
            success: true,
            data: newBlog,
            message: "blog added successfully"
        });
    } else {
        res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
});

app.get("/blogs", async (req, res) => {
    let allblog = await Blogs.find();
    res.json({
        success: true,
        data: allblog
    });
});

app.get("/blogs/:id", async (req, res) => {
    let { id } = req.params;
    let blog = await Blogs.findOne({ _id: id });
    res.json({
        success: true,
        data: blog
    });
});

// USER & AUTH ROUTES
app.post("/users/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required."
        });
    }

    const user = await Users.findOne({ username });

    if (!user || user.password !== password) { // Plain text password comparison
        return res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
        success: true,
        message: "Login successful",
        token: token
    });
});

app.post("/users", async (req, res) => {
    try {
        let { email, username, password } = req.body;
        let newUser = new Users({
            email: email,
            username: username,
            password: password
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            data: newUser,
            message: "User created successfully"
        });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            return res.status(409).json({
                success: false,
                message: "A user with that email or username already exists."
            });
        }
        // Other errors
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the user.",
            error: error.message
        });
    }
});

app.get("/users", async (req, res) => {
    let allUsers = await Users.find();
    res.json({
        success: true,
        data: allUsers
    });
});

app.get("/users/:id", async (req, res) => {
    let { id } = req.params;
    let userExist = await Users.findOne({ _id: id }).populate("blogs");
    if (userExist) {
        res.json({
            success: true,
            data: userExist
        });
    }
});

//deleteblog
app.delete("/blogs/:blogId", isLogin, async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.userId; // Get user ID from token

        const blog = await Blogs.findById(blogId);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Check if the logged-in user is the owner of the blog
        if (blog.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Authorization failed. You do not own this blog." });
        }

        // Delete the blog
        await Blogs.findByIdAndDelete(blogId);

        // Remove the blog reference from the user's document
        await Users.findByIdAndUpdate(userId, { $pull: { blogs: blogId } });

        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

//update blog
app.put("/blogs/:blogId", isLogin, async (req, res) => {
    try {
        const { blogId } = req.params;
        const { title, body } = req.body;
        const userId = req.userId; // Get user ID from token

        const blog = await Blogs.findById(blogId);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Check if the logged-in user is the owner of the blog
        if (blog.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Authorization failed. You do not own this blog." });
        }

        // Update the blog
        blog.title = title;
        blog.body = body;
        await blog.save();

        res.json({ success: true, message: "Blog updated successfully", data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Server and DB Connection
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
    .then(() => console.log('Connected!'));