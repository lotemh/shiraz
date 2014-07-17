var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.json');
var restaurants = require('./restaurants.json');
var app = express();

var placesToEatOld = ['גבאי', 'סירים']; //and so on...
var placesToEat = restaurants.data;
var lastDayOfUpdate = new Date();
var foodOfTheDayIndex = 0;

function getFoodOfTheDay() {
    var dateOfToday = new Date();
    if (dateOfToday.getMonth() === lastDayOfUpdate.getMonth()
        &&
        dateOfToday.getDate() !== lastDayOfUpdate.getDate()
		&& dateOfToday.getDay() !== 5
		&& dateOfToday.getDay() !== 6) {
        updateFoodOfTheDayIndex();
    }
    return placesToEat[foodOfTheDayIndex];
};

function updateFoodOfTheDayIndex(){
	foodOfTheDayIndex = (foodOfTheDayIndex+1) % placesToEat.length;
};

app.use('/', express.static(__dirname + '/public'));

app.get('/getFood', function(req, res){
    res.send(getFoodOfTheDay());
});

var server = app.listen(config.port);



/*
//file1:
function x() {}

module.exports = {
	x: x
}

file2:

var bla = require('./file1.js')

bla.x()


*/