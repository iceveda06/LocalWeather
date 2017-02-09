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


$(document).ready(function() {

    //geting local IP to avoid user interaction for allowing to find location, not as accurate but close enough

    $.getJSON('http://ip-api.com/json', function(loc) {
        //$('#data').html(loc.lon);
        lon = loc.lon;
        lat = loc.lat;

        //getting local temperature from OpenWeatherMap

        $.get("http://api.openweathermap.org/data/2.5/weather?" + 'lat=' + lat + '&lon=' + lon + "&units=imperial" + "&APPID=0f282dc00daa96e733691054692f8b33", function(weather) {
            $("#tempText").html("Current Weather in " + weather.name + " " + "is " + Math.round((weather.main.temp * 100) / 100) + String.fromCharCode(176));

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
            }else
$('body').css('background-image', 'url(' + "animated/other.jpg" + ')');


        }, 'jsonp');

        // getting forecast for the next 5 days

        $.get("http://api.openweathermap.org/data/2.5/forecast/daily?" + 'lat=' + lat + '&lon=' + lon + "&units=imperial" + "&APPID=0f282dc00daa96e733691054692f8b33", function(forecast) {

            var divsToAppend = "";
            // calculate unix time to regular time **use forecast.list[0].dt as the time, use
            for (var i = 1; i < forecast.list.length; i++) {
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var dateTime = new Date(forecast.list[i].dt * 1000);
                var todaysDate = days[dateTime.getDay()];
                divsToAppend += '<div id = "day' + (i) + '">' + (todaysDate + "  " + Math.round(forecast.list[i].temp.day * 100 / 100) + String.fromCharCode(176)) + " " + ("<img src='http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>") + '</div>';
            }
            $('#forecast1').append(divsToAppend);


        }, 'jsonp');
    });

});
