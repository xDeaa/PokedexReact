const express = require("express");
const bodyParser = require("body-parser");
const api = express();
// const sqlite = require("sqlite3");
// const db = new sqlite.Database("myDb");
const session = require("express-session");
const port = parseInt(process.argv[2],10) || 5000;

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(express.static('view/public'));
api.use(session({secret:'ssshhhhhh'}));

api.use( (req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 require("./routes/pokemons.js")(api);
 //require("./routes/users.js")(api);


api.listen(port,() => {
    console.log(`Server is running on port ${port} ... `);
  })
