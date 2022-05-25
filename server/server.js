require("dotenv").config();
let mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");
const bodyParser = require('body-parser')
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const newsRoute = require("./routes/newsLetter");
var cors = require('cors')


//return the addition for two integers


const express = require("express");
const app = express();
app.use(cors())

app.use('/public', express.static('public'));
// Connect To DataBase
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: false
  }));

app.use("/api/v1/product",productRoute)

app.use("/api/v1/user",userRoute)

app.use("/api/v1/order",require("./routes/order"))
app.use("/api/v1/auth",authRoute)

app.use("/api/v1/news",newsRoute)
app.use("/api/v1/comments",require("./routes/comment"))
app.use("/api/v1/checkout-pay",require("./routes/paypalck"))
app.use("/api/v1/checkout-stripe",require("./routes/checkout-stripe"))


app.listen(process.env.PORT || 3000, function () {
  console.log("server Started !!");
});
