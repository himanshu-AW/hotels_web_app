const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = process.env.PORT || 4000;


app.get("/", (req, res) => {
  res.send("Welcome to our Grand Hotel.");
});


// Import routes for person data
const personRotes = require("./routes/personRoutes");
app.use('/person',personRotes);


// Import routes for menu item data
const menuItemRotes = require("./routes/menuItemRoutes");
app.use('/menu', menuItemRotes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
