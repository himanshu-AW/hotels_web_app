// Using Node.js `require()`
const mongoose = require("mongoose");

// Define the mongoDB connection url
const mongoURL = "mongodb://localhost:27017/hotels";

// set up the mongoDB Connection
mongoose.connect(mongoURL,{
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})

// Get the default connection
// MOngoose maintains a default conncetion object representing the MongoDB conncetion.
const db = mongoose.connection;


// Define event listeners for database conncetion.
db.on("connected",() =>{
  console.log("Connected to mongodb server");
})

db.on("error", (err) => {
  console.error("Error connecting to mongodb server", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from mongodb server");
});

module.exports = db;
