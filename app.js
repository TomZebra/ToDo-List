const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

//Moramo item odnosno postMalone definirati odmah jer inace program nece znati da je to definirano jer barata sa njima tek na kraju.
const items = ["Operi auto", "Natoči benzina", "odi u kupovinu"];
const workItems = [];

// Obavzeno staviti ispod app = express linije koda jer prije nje  ne postoji express na sta se EJS oslanja
app.set("view engine", "ejs");

//Nemoj zaboraviti kada god imas posla sa  dohvacanjem elemenata iz html-a, setupat app.use body parser inace nista od svega toga
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




app.get("/", function (req, res) {

const day = date.getDate();
  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/");
  }

});


app.post("/deleteItem", (req, res) => {
  let item = req.body.button;
  items.splice(items.indexOf(item), 1);

  res.redirect("/");
})


app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});


app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(3000, function () {
  console.log("Server is up and running on port 3000");
});
