var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.json');
var restaurants = require('./restaurants.json');
var State = require('./state.js');
var state = new State(__dirname + '/state.json');
var app = express();

var placesToEat = restaurants.data;
var lastDayOfUpdate = new Date();

function getFoodOfTheDay() {
	var foodOfTheDayIndex = getFoodOfTheDayIndex();
    var dateOfToday = new Date();
     if (dateOfToday.getMonth() === lastDayOfUpdate.getMonth()
         &&
         dateOfToday.getDate() !== lastDayOfUpdate.getDate()
		 && dateOfToday.getDay() !== 5
		 && dateOfToday.getDay() !== 6) {
        foodOfTheDayIndex = updateFoodOfTheDayIndex(foodOfTheDayIndex);
		state.write('foodOfTheDayIndex', foodOfTheDayIndex);
     }
	lastDayOfUpdate = dateOfToday;
    return placesToEat[foodOfTheDayIndex];
};

function updateFoodOfTheDayIndex(index){
	return (index+1) % placesToEat.length;
};

function getFoodOfTheDayIndex(){
	return state.read('foodOfTheDayIndex');
}

app.use('/', express.static(__dirname + '/public'));

app.get('/getFood', function(req, res){
    res.send(getFoodOfTheDay());
});

var server = app.listen(config.port);
