//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const port = 3090;
const app = express();

let items = ["1 liter of milk each", "Oranges"];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


app.set("view engine", "ejs");


app.get("/", function(req, res) {

  // format date : https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  let options = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric"
  }

  let today = new Date();
  let day = today.toLocaleDateString("de-CH", options);

  res.render('list', {
    today: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  // Add item to item Array
  let item = req.body.item;
  items.push(item);
  // go back to the get reqeues and then renders new
  res.redirect("/");
});

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
