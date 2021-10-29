const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const items = ['buy food', 'cook', 'eat'];
const workItems = [];

app.get('/', (req, res) => {

    const day = date.getDate();
    res.render('lists', { listTitle: day, newItems: items });

});

app.post('/', (req, res) => {
    const item = req.body.newItem;

if (req.body.list === 'work') {
    console.log(req.body.list);
    workItems.push(item);
    res.redirect('/work');
} else {
    items.push(item);
    res.redirect('/');
}

});

app.get('/work', (req, res) => {
    res.render('lists', { listTitle: 'work list', newItems: workItems });
});

app.get('/about', (req,res)=>{
    res.render('about');
});

app.listen(8080, () => {
    console.log('listening on http://localhost:8080');
});