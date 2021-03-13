require("dotenv").config();
const express = require("express");
const { auth } = require('express-openid-connect');
const app = express();

app.set("view engine", "ejs");
app.use(express.json(), express.urlencoded({extended: false}));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: 'https://myauth0api.herokuapp.com',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://dev-j5dnvaff.us.auth0.com'
};
app.use(auth(config));

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/api/callback", (req, res) => {
  res.send("Callback page");
});

app.listen(process.env.PORT||3000, function(err){
  if(err) throw err;
  console.log(`Server started`);
});
