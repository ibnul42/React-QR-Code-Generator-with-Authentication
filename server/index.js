const express = require("express");
const ConnectDB = require("./Utility/ConnectDB");
const app = express();
const PORT = 5000 || process.env.PORT;
require("dotenv").config();

app.use(express.json());

// connect db
ConnectDB();

// routes
app.use("/api", require("./routes/api"));

app.listen(PORT, () => {
  console.log(`[Server] started on port on https://localhost:${PORT}`);
});
