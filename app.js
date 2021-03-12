const express = require("express");
const { auth } = require('express-openid-connect');
const app = express();

app.set("view engine", "ejs");
app.use(express.json(), express.urlencoded({extended: false}));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'wK2axgz8XqZsAN70z2cNFA5QxrusjCMYSAIYvBcnWkAAZQnXOa5tNIOuFhPvKGQz',
  baseURL: 'http://localhost:3000',
  clientID: 'sYUw4oI4tmM7Zz5a0YyfquUyecScOau6',
  issuerBaseURL: 'https://dev-j5dnvaff.us.auth0.com'
};
app.use(auth(config));

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/callback", (req, res) => {
  res.send("Callback page");
});

app.listen(3000, function(err){
  if(err) throw err;
  console.log(`Server is listened on port: 5000`);
});
