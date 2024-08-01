const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./config/connect");
const app = express();

dotenv.config();

const PORT = process.env.PORT;
connection();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use("/api/user", require("./routers/credentialRoutes"));
app.use("/api/user", require("./routers/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
