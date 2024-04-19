### This project idea is generated from ChatGPT
---
## Project preview (for more image preview please see images in preview folder)
![alt text](https://github.com/gedePakusadewa/4_weather_web_FE/blob/master/preview/desktop_3.png)
![alt text](https://github.com/gedePakusadewa/4_weather_web_FE/blob/master/preview/mobile_3.png)

# Project Idea: Weather Dashboard

Description:
Create a weather dashboard that allows users to check the current weather and forecast for a given location. The project will involve both front-end and back-end development, integrating with a free weather API.

Key Features:

- User Authentication:
  Allow users to sign up and log in to the platform. This can be a simple email/password authentication system.
- Location Search:
  Implement a search feature that enables users to enter the name or coordinates of a location to get weather information.
- Weather Display:
  Fetch weather data from a free weather API (such as OpenWeatherMap or Weatherstack) based on the user's input.
  Display the current temperature, humidity, wind speed, and other relevant information.
  Provide a visual representation of the weather conditions, such as icons for sunny, rainy, or cloudy weather.
- Forecast:
  Show a multi-day forecast for the selected location.
  Include details like daily highs and lows, precipitation probability, and wind direction.
- User Preferences:
  Allow users to set their preferred units for temperature (Celsius/Fahrenheit), wind speed, etc.
- ~History and Favorites~ (NOT IMPLEMENTED):
  Implement a feature that stores users' search history and allows them to mark locations as favorites.
- Responsive Design:
  Ensure the application is responsive and works well on various devices, such as desktops, tablets, and mobile phones.
- Error Handling: 
  Provide user-friendly error messages for cases like invalid location input or API request failures.

##### Technologies:

- Front-end:
  Use a modern front-end framework like React, Vue, or Angular.
  Utilize HTML, CSS, and JavaScript for the user interface.
  Ref: https://uizard.io/static/9e9f1bfeac21afca096f9e286390cc6e/d9bdf/weather-web-dark-home.png
- Back-end:
  Choose a back-end framework such as Express.js (Node.js), Django (Python), or Spring Boot (Java). 
  Implement RESTful APIs to handle user authentication, location search, and weather data retrieval.
- Database:
  You may not need a database for this project since it's relatively lightweight. However, if you decide to implement features like storing user preferences, you can use a simple database like MongoDB or SQLite.
- APIs:
  Integrate with a free weather API like OpenWeatherMap or Weatherstack for fetching weather data.
- Authentication:
  Use JWT (JSON Web Tokens) or a similar authentication mechanism for securing user accounts(for now only use token auth/autho).
- Deployment(not implemented):
  Deploy your application on platforms like Heroku, Netlify, or Vercel.

Source API -> https://www.weatherapi.com/
