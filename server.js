require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

// ✅ CORS setup for requests with credentials
app.use(cors({
  origin: "https://ai-project-itee.vercel.app", // frontend URL
  credentials: true, // allow cookies and authorization headers
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api", require("./routes/aiRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});