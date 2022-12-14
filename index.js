require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const homelyRoutes = require("./routes/homely");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/homelyCart")

// express app
const app = express();
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/homely", homelyRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
