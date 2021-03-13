require("dotenv").config();
const express = require("express");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const app = express();

app.set("view engine", "ejs");
app.use(express.json(), express.urlencoded({extended: false}));

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-j5dnvaff.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://myauth0api.herokuapp.com/api/auth',
  issuer: 'https://dev-j5dnvaff.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.listen(process.env.PORT||3000, function(err){
  if(err) throw err;
  console.log(`Server started`);
});
