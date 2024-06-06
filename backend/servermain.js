const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./Config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");

dotenv.config();

connectDB();
const app = express();

app.use(express.json());  //To accept json data

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/user",userRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));