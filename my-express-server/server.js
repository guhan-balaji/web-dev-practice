// jshint esversion: 6

const express = require('express');
const { req, res } = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('<h1>hello</h1>');
}); 

app.get('/about',(req,res)=>{
    res.send('my name is gb');
}); 

app.get('/contact',(req,res)=>{
    res.send('guhanbalaji7@gmail.com');
}); 

app.listen(3000,()=>{
    console.log('server started on port 3000');
});