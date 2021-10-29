const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');

});

app.post('/', (req, res) => {

    const appId = '246df4c81b894d594d505134fa18f13b';
    const city = req.body.cityName;
    const units = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + units + '&appid=' + appId;

    https.get(url, (response) => {
        console.log('http status: '+ response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';


            res.write('<h1>The temperature in ' + city + ' is <em>' + temp + '</em> degree celsius</h1>');
            res.write('<p>The weather: ' + weatherDescription + '</p>');
            res.write('<img src=' + imgURL + '>');
            res.send();

        });
    });
});

app.listen(3000, (req, res) => {
    console.log('port 3000');
});
