import express from 'express';
import axios from 'axios';
import Bodyparser from 'body-parser';
const app = express();
const port = 3000;

app.use(Bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


const API_KEY = '43b461a7fc8d90ff095c039756e5c1bf'; // Replace with your API key

app.get('/', (req, res) => {
  res.render('index', { weatherData: null });
});

app.post('/get-weather', async (req, res) => {
  const cityName = req.body.city;
  const units = 'metric'; // Change to 'imperial' for Fahrenheit
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${API_KEY}`;


  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    res.render('index', { weatherData });
  } catch (error) {
    console.error('Error:', error);
    res.render('index', { weatherData: null });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
