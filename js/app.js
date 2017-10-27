/*
GOAL:  Build a weather app that can do the following:

    1.  See the weather in my current location  ***DONE
        a.  Get current location  ***DONE
        b.  Find the weather according to current location  ***DONE
    2.  See different icon or background image depending on the weather.  ***DONE  
        a.  According to weather, show proper icon  ***DONE
    3.  Push a button to toggle between Fahrentheit and Celsius.
        a.  Calculate Celsius/Fahrenheit conversion 
        b.  roll the number so it's an integer  ***DONE
    4.  Get the forecast for the next 5 days  ***DONE
    5.  As a user i can see different image depending on the weather  ***DONE
*/

var value = "";
var lng, lati, loc, lon, lat;
$(document).ready(function() {
    //Get city name
    var form = document.getElementById('nameForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent normal form submission
        var value = document.getElementById('cityForm').value;
        console.log(value);
        var urli = "https://maps.googleapis.com/maps/api/geocode/json?" + 'address=' + value + "&key=AIzaSyA7kvvU8hEBBmTg3Fw_dteJx4DJ0BvuOG0"
        console.log(urli);

        //getting lat/long to avoid user interaction for allowing to find location, not as accurate but close enough
        $.get("https://maps.googleapis.com/maps/api/geocode/json?" + 'address=' + value + "&key=AIzaSyA7kvvU8hEBBmTg3Fw_dteJx4DJ0BvuOG0", function(locate) {
            console.log(value);
            lng = locate.results[0].geometry.location.lng;
            lati = locate.results[0].geometry.location.lat;
            console.log(lng);
            console.log(lati);


            //getting local temperature from OpenWeatherMap

            $.get("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?" + 'lat=' + lati + '&lon=' + lng + "&units=imperial" + "&APPID=0f282dc00daa96e733691054692f8b33", function(weather) {
                $("#tempText").html("Current Weather in " + value + " " + "is " + Math.round((weather.main.temp * 100) / 100) + String.fromCharCode(176));


$("#fahrenheit").on("click", function () {
                $("#tempText").html("Current Weather in " + value + " " + "is " + Math.round((weather.main.temp * 100) / 100) + String.fromCharCode(176));

});
$("#celsius").on("click", function() {
var ctemp = Math.round((((((weather.main.temp) - 32) * 5) / 9)*100)/100);
                    $("#tempText").html("Current Weather in " + value + " " + "is " + ctemp + String.fromCharCode(176));

});
                //loads the icon depending on what api says the icon should be and the background image

                $("#icon").html("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
                if (weather.weather[0].icon === "01d") {
                    $('body').css('background-image', 'url(' + "animated/clear_sky_day.jpg" + ')');
                } else if (weather.weather[0].icon === "01n") {
                    $('body').css('background-image', 'url(' + "animated/clear_sky_night.jpg" + ')');
                } else if (weather.weather[0].icon === "02d") {
                    $('body').css('background-image', 'url(' + "animated/few_clouds_day.jpg" + ')');
                } else if (weather.weather[0].icon === "02n") {
                    $('body').css('background-image', 'url(' + "animated/few_clouds_night.jpg" + ')');
                } else if (weather.weather[0].icon === "03d" || "03n") {
                    $('body').css('background-image', 'url(' + "animated/scattered_clouds.jpg" + ')');
                } else if (weather.weather[0].icon === "04d" || "04n") {
                    $('body').css('background-image', 'url(' + "animated/broken_clouds.jpg" + ')');
                } else if (weather.weather[0].icon === "09d" || "09n") {
                    $('body').css('background-image', 'url(' + "animated/shower_rain.jpg" + ')');
                } else if (weather.weather[0].icon === "10d") {
                    $('body').css('background-image', 'url(' + "animated/rain_day.jpg" + ')');
                } else if (weather.weather[0].icon === "10n") {
                    $('body').css('background-image', 'url(' + "animated/rain_night.jpg" + ')');
                } else if (weather.weather[0].icon === "11d" || "11n") {
                    $('body').css('background-image', 'url(' + "animated/thunderstorm.jpg" + ')');
                } else if (weather.weather[0].icon === "13d" || "13n") {
                    $('body').css('background-image', 'url(' + "animated/snowing.jpg" + ')');
                } else if (weather.weather[0].icon === "50d" || "50n") {
                    $('body').css('background-image', 'url(' + "animated/misty.jpg" + ')');
                } else
                    $('body').css('background-image', 'url(' + "animated/other.jpg" + ')');
            }, 'jsonp');

            // getting forecast for the next 5 days

            $.get("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?" + 'lat=' + lati + '&lon=' + lng + "&units=imperial" + "&APPID=0f282dc00daa96e733691054692f8b33", function(forecast) {
                console.log("http://api.openweathermap.org/data/2.5/forecast/daily?" + 'lat=' + lati + '&lon=' + lng + "&units=imperial" + "&APPID=0f282dc00daa96e733691054692f8b33")
                var divsToAppend = "";
                var divsToAppendC = "";
                // calculate unix time to regular time **use forecast.list[0].dt as the time, use
                for (var i = 1; i < forecast.list.length; i++) {
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    var dateTime = new Date(forecast.list[i].dt * 1000);
                    var todaysDate = days[dateTime.getDay()];
                    divsToAppend += '<div id = "day' + (i) + '">' + (todaysDate + "  " + Math.round(forecast.list[i].temp.day * 100 / 100) + String.fromCharCode(176)) + " " + ("<img src='http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>") + '</div>';
                    divsToAppendC += '<div id = "day' + (i) + '">' + (todaysDate + "  " + Math.round(((((forecast.list[i].temp.day) - 32) * 5) /9) * 100 / 100) + String.fromCharCode(176)) + " " + ("<img src='http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>") + '</div>';
                }
                

                $('#forecast1').html(divsToAppend);
$("#fahrenheit").on("click", function () {
                $("#forecast1").html(divsToAppend);
});
$("#celsius").on("click", function() {
    
                    $("#forecast1").html(divsToAppendC);
});
 

            }, 'jsonp');

  });

});

});
