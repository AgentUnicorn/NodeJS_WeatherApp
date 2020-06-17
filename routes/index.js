var express = require('express');
var router = express.Router();
const getCordinate = require("../utils/getCordinate")
const getForecast = require("../utils/getForecast")


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    console.log(req.query)
    //get the city value 
    const {city} = req.query
    
    if(!city)
    return res.render('index', { title: 'Weather App' });

    // get cordinate from city name
    const location = await getCordinate(city)
    // console.log("this is location",location)

    // Use location coords to get the forecast
    const forecast = await getForecast(location.geometry.coordinates)
    console.log("Forecast", forecast.daily)
    
    // Get the Picture icon code
    const iconcode = forecast.current.weather[0].icon
    // Put icon code into url 
    const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    // render all the thing you want
    return res.render('index', { 
      title: 'Weather App', 
      city: city,
      iconurl: iconurl,
      forecast: forecast.current 
    }); // need return or your website will keep runnig forever
  } catch (err) {
    next(err)
  }
});

module.exports = router;
