var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var app = express();

var placesToEat = ['גבאי', 'סירים']; //and so on...
var lastDayOfUpdate = new Date();
var foodOfTheDayIndex = 0;

var getFoodOfTheDay = function() {
    var dateOfToday = new Date();
    if (dateOfToday.getMonth() === lastDayOfUpdate.getMonth()
        &&
        dateOfToday.getDate() !== lastDayOfUpdate.getDate()) {
        updateFoodOfTheDayIndex();
    }
    return placesToEat[foodOfTheDayIndex];
};

var updateFoodOfTheDayIndex = function(){
    foodOfTheDayIndex++;
    if (foodOfTheDayIndex >= placesToEat.length)
        foodOfTheDayIndex = 0;
};

app.use('/', express.static(__dirname + '/public'));

app.get('/getFood', function(req, res){
    res.send(getFoodOfTheDay());
});

var server = app.listen(config.port);