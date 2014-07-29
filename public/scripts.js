
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

	$.ajax({
                url: 'getFood',
                dataType: 'text',
                type: 'GET',
                success: function(foodPlace){
                    document.getElementById("baloonText").innerHTML = foodPlace;
					document.getElementById("baloonElement").style.visibility = "visible";
                }.bind(this),
                error: function(xhr, status, err){
                    console.error("", status, err.toString());
                }.bind(this)
            });
}

function setRandomPopsicle() {
	setRandomElement(popsicleArray);
}

function setRandomElement(elementArray) {
	var randomNumber = Math.floor(Math.random()*elementArray.length);
	document.getElementById("baloonElement").style.visibility = "visible";
	document.getElementById("baloonText").innerHTML = elementArray[randomNumber];
}