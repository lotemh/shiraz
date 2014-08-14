
var popsicleArray = [
    'לימון',
    'אננס',
	'תפוח',
	'משמש',
    'דובדבן',
	'ענבים',
	'תותי פרוטי',
	'קסטה',
    'שוקו שוקו',
	'שוקו וניל',
	'שוקו בננה'
];

function setRandomRestaurant() {
	var todaysFoodPlace;

	 getFoodPlace(function(foodPlace){
		todaysFoodPlace = foodPlace;
		document.getElementById("baloonText").innerHTML = foodPlace;
		document.getElementById("baloonElement").style.visibility = "visible";	
	 });
			 
	getRestaurants( function(restaurants){
		setAlternativeFoodPlace(todaysFoodPlace, restaurants);
	});		 
}

function getRestaurants(callback){
	$.ajax({
		url: 'getFoodPlaces',
		dataType: 'json',
		type: 'GET',
		success: function(restaurants){
			callback(restaurants);
		}.bind(this),
		error: function(xhr, status, err){
			console.error("", status, err.toString());
		}.bind(this)
	});
}

function getFoodPlace(callback){
	$.ajax({
			url: 'getFood',
            dataType: 'text',
            type: 'GET',
            success: function(foodPlace){
				callback(foodPlace);	
            }.bind(this),
            error: function(xhr, status, err){
				console.error("", status, err.toString());
            }.bind(this)
    });
}

function showRestaurants(){
	getRestaurants(function(restaurants){
		var list = document.createElement('ul');
		document.getElementById('restaurants').appendChild(list);
		restaurants.forEach(function(rest){
			var elm = document.createElement('li'); 
			elm.innerHTML = rest; 
			list.appendChild(elm);
		});
	});
}

function setAlternativeFoodPlace(todaysFoodPlace, restaurants){
	var maybeText = "Or Maybe: ";
	var text = document.getElementById("altText");
	var withoutPlaces = [todaysFoodPlace, text.innerHTML.replace(maybeText, "")];
	text.innerHTML = maybeText + getAlternativeFoodPlace(restaurants, withoutPlaces, 4);
	document.getElementById("alternativeFood").style.visibility = "visible";
}

function getAlternativeFoodPlace(restaurants, withoutPlaces, retries){
	for (var i = 0; i < retries; i++){
		var placeToEat = getRandomElement(restaurants);
		if (withoutPlaces.indexOf(placeToEat) === -1) 
			return placeToEat;
	}
	return todaysFoodPlace;
}

function setRandomPopsicle() {
	setRandomElement(popsicleArray);
}

function setRandomElement(elementArray) {
	document.getElementById("alternativeFood").style.visibility = "hidden";
	document.getElementById("baloonElement").style.visibility = "visible";
	document.getElementById("baloonText").innerHTML = getRandomElement(elementArray);
}

function getRandomElement(arr){
	var randomNumber = Math.floor(Math.random()*arr.length);
	return arr[randomNumber];
}