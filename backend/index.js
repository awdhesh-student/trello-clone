const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./config/connect");
const app = express();
const path = require("path");

const __dir = path.resolve();

dotenv.config();

const PORT = process.env.PORT;
connection();

app.use(express.json());
app.use(
  cors({
    origin: "https://trello-clone-x8qo.onrender.com",
    methods: "GET,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use("/api/user", require("./routers/credentialRoutes"));
app.use("/api/user", require("./routers/userRoutes"));

app.use(express.static(path.join(__dir, "/frontend/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dir, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
