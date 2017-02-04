/*
GOAL:  Build a weather app that can do the following:

	1.  See the weather in my current location
		a.  Get current location
		b.  Find the weather according to current location
	2.  See different icon or background image depending on the weather.  
		a.  According to weather, show proper icon
	3.  Push a button to toggle between Fahrentheit and Celsius.
		a.  Calculate Celsius/Fahrenheit conversion 
*/


$(document).ready(function() {
    // $("#getMessage").on("click", function() {
//getting weather using local coordinates from darksky
navigator.geolocation.getCurrentPosition(function(location) {
    var lat = location.coords.latitude;
    var lon = location.coords.longitude;
    console.log("this is " +lat);
    console.log(lon);
});
    $.get("https://api.darksky.net/forecast/80b31ad83d9fd2a91cbc3800e400628c/30,-97", function(weather) {
        var temperature = weather.currently.temperature;
        var icon = weather.currently.icon;
        $("#tempText").html("Temperature is " + temperature);
        $("#icon").html("Icon is " + icon);
        console.log(temperature);
    }, 'jsonp');
});
