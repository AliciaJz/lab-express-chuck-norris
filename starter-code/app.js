const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/random", function(req, res, next) {
  // Retrieve a random chuck joke
  client
    .getRandomJoke()
    .then(response => {
      res.render("random", { randomJoke: response.value });
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/categories", function(req, res, next) {
  console.log(req);
  if (req.query.cat) {
    client
      .getRandomJoke(req.query.cat)
      .then(response => {
        res.render("joke-by-category", { randomCatJoke: response.value });
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    client
      .getJokeCategories()
      .then(response => {
        res.render("categories", { categoryList: response });
      })
      .catch(err => {
        res.send(err);
      });
  }
});

app.get("/search", function(req, res, next) {
  res.render("search-form");
  next();
});

app.post("/search", function(req, res, next) {
  client.search(req.body.term)
 .then(function (response) {
   res.render("search-form",  {searchJoke: response.items})
 }).catch(function (err) {
   res.send(err)
 });
});

app.get("/", function(req, res, next) {
  res.send("jad bzzzbzzz");
  next();
});


app.listen(3000, function(err) {
  if (err) console.log(err);
  console.log("tu servidor esta funcionando en el puerto 3000");
});
