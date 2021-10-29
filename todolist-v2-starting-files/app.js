//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemShema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemShema);

const item1 = new Item({
  name: 'Welcome to to do lise'
});

const item2 = new Item({
  name: 'Press + button to add items'
});

const item3 = new Item({
  name: '<-- use this to delete items'
});

const defaultItems = [item1, item2, item3];


const listSchema = new mongoose.Schema({
  name: String,
  items: [itemShema]
});

const List = mongoose.model('List', listSchema);


app.get("/", function (req, res) {

  //const day = date.getDate();

  Item.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('successfully saved default items to db');
          }
        });
        res.redirect('/');
      }
      res.render("list", { listTitle: 'Today', newListItems: foundItems });
    }
  });
});

app.get("/:customListName", function (req, res) {

  const customListName = _.capitalize(req.params.customListName) ;

  List.findOne({ name: customListName }, function (err, foundList) {
    if (err) {
      console.log(err);
    } else {
      if (!foundList) {

        const list = new List({
          name: customListName,
          items: defaultItems
        });

        list.save();
        res.redirect('/' + customListName);

      } else {

        res.render("list", { listTitle: foundList.name, newListItems: foundList.items });

      }
    }
  });

});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === 'Today') {
    item.save();
    res.redirect('/');

  } else {
    List.findOne({name: listName}, function (err, foundList) { 
      foundList.items.push(item);
      foundList.save();
      res.redirect('/' + listName);
     });
  }


});

app.post('/delete', (req, res) => {

  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === 'Today') {

    Item.findByIdAndRemove(checkedItemId.slice(0, checkedItemId.length - 1), function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('deleted checked item successfully');
        res.redirect('/');
      }
    });

  } else {
    
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function (err, foundList) { 
      if (err) {
        console.log(err);
      } else {
        res.redirect('/' + listName);
      }
     });
  }

});



app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
