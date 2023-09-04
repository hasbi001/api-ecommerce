const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync().then(() => {
    console.log('Drop and Resync Db');
    // initial();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "ecommerce",
    keys: ["eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MzA2ODI1OSwiaWF0IjoxNjkzMDY4MjU5fQ.iiaX_sI75bOzQqx6x-mPNRAj2TF5X4_N8Lxd35Q47zI"], // should use as secret environment variable
    httpOnly: true,
  })
);


function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
}

require('./app/routes/api.route')(app);
// require('./app/routes/auth.route')(app);
// require('./app/routes/user.route')(app);
// require('./app/routes/product.route')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});