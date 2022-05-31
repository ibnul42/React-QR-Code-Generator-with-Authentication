const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

mongoose.connect(
  "mongodb+srv://user001:Password1234@cluster0.wxqfzpv.mongodb.net/multiAuth?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(cors());

app.post("/loginUser", async (req, res) => {
  const { username, password } = req.body;

  // check for user username
  const user = await UserModel.findOne({ username });
  if (user === null) {
    res.status(400).json("Invalid username or password");
  } else if (user.username !== username || user.password !== password) {
    res.status(400).json("Invalid username or password");
  } else {
    const authenticationCode = (Math.random() * 100000).toFixed(0);
    res.status(200).json({ user, authenticationCode });
  }
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const { name, username, password } = req.body;

  if (!username || !name || !password) {
    res.status(400).json("Please fill all fields");
  }
  // Check if user exists
  const userExists = await UserModel.findOne({ username });

  if (userExists) {
    res.status(400).json("User already exists");
  } else {
    const newUser = new UserModel(user);
    await newUser.save();
    res.status(200).json("User created successfully");
  }
});

app.listen(5000, () => {
  console.log("Server listening!");
});
