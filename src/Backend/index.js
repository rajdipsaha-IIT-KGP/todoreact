const express = require('express');
const cors = require('cors'); 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { UserModel, TodoModel } = require('./db');

const app = express();
app.use(cors()); 
app.use(express.json());


const JWT_SECRET = 'your_jwt_secret_key'; 
mongoose.connect('mongodb+srv://rajdipsaha7697:Rajdip%402006@rajdip.r4ziwjt.mongodb.net/ToDoAppDataBase')


  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// 👉 Signup route
app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
const hashpassword = await bcrypt.hash(password, 10);
  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await UserModel.create({ email:email, password:hashpassword, name:name });
    return res.json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error inserting user:", err);
    return res.status(500).send("Already registered or error inserting user");
  }
});


app.post("/signin", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await UserModel.findOne({ email:email });
    if (!user) {
      return res.status(403).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
  return res.status(403).send("Incorrect password");
}
    if (isPasswordValid) {
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      message: "User signed in successfully",
      user,
      token
    });
  }
 } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).send("Error finding user");
  }
});


app.post("/todo", auth,async (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;
 await TodoModel.create({ title:title, done:done, userId: userId });
  res.json({
    message: "Todo created successfully",
    userId
  });
});


app.get("/todos", auth,async (req, res) => {
  const userId = req.userId;
  try{const todos = await TodoModel.find({ userId: userId });
  res.json({
    todos: todos
  });
   res.json({
    message: "Todos fetched successfully",
    todos: todos})}
  catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).send("Error fetching todos");
  }
  
});
function auth(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    req.userId = decodedInfo.id;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
}


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
