const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/signup.html');

});

app.post('/', (req, res) => {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us17.api.mailchimp.com/3.0/lists/746fbb629d';
    const options = {
        method: 'POST',
        auth: "AUTHID"
    };

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }
    });

    request.write(jsonData);
    request.end();

});

app.post('/failure.html', (req, res) => {
    res.redirect('/');
});



app.listen(process.env.PORT || 3000, () => {
    console.log('http://localhost:3000');
});

