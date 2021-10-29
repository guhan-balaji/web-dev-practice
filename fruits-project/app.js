const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017/fruitsDB';

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'u did not enter a name']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
   name: 'Apple',
    rating: 7,
    review: 'good'
});

//fruit.save();

// const personSchema = mongoose.Schema({
//     name: String,
//     age: Number
// });

// const Person = mongoose.model('Person', personSchema);

// const person = new Person({
//     name: 'Gb',
//     age: 20
// });

// //person.save();

// const kiwi = new Fruit({
//     name: 'Kiwi',
//     rating: 8,
//     review: 'pretty good'
// });

// const orange = new Fruit({
//     name: 'Orange',
//     rating: 6,
//     review: 'pretty sour'
// });

// Fruit.insertMany([kiwi, orange], (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('updated db');
//     }
// });

Fruit.find((err, fruits) => {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();
        fruits.forEach(el => console.log(el.name));
    }
});