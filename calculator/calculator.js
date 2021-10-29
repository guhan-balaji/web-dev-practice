// jshint esversion: 6

const bodyParser = require('body-parser');

const app = require('express')();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;

    res.send('the result is: ' + result);
});

app.get('/bmicalculator', (req,res)=>{
    res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmicalculator', (req,res)=>{
    var w = parseFloat(req.body.num1);
    var h = parseFloat(req.body.num2);
    var result = w/(h*h);

    res.send('the result is: ' + result);
});

app.listen(3000, () => {
    console.log('running on port 3000');
});