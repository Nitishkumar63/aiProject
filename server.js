require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors(
  {origin:"https://ai-project-il68.vercel.app"}
));
app.use(express.json());

app.use("/api", require("./routes/aiRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});