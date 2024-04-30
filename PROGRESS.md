- new feature
  - setting
    - user can enter instead of click save
    - after user click save the appear modal to say save is success
  
  - profile
    - user can enter instead of click update

  - dashboard
    - add text "good morning, user" based on time to user

- bugs
  - dashboard
    - ~fix today forecast that not display item in some cities~
    - fix newxt 7 day forecast that is not display 7 day forecast
      - from weather API only send max three days, as far as i remenber, API provided 8 days ahead,
      i already contact the weather API ask about the condition, still waiting response
    - ~change title in next 7 day forecast~
    - ~fix paddding in next 7 day forecast~
    - mobile
        - font degree temperature in today forecast section is to big, make it smaller
        - in section next 7 day forecast, there is a bug so the data is not display at all but in desktop its normal
        -  
  
  - ~setting~
    - ~implement fahrenheit degree~

  - profile
    - user can submit empty username and enpty email
      - check this code https://www.freecodecamp.org/news/how-to-validate-forms-in-react/

  - LOGIN/SIGN UP
    - ~user cannot login automatically when user open two tabs, one tab already login but when user open url in second tab, system still requst user to login~
    - user cant use enter button for altenative click login button
    - user open and login in two tab, if user log out in first tab, then when user logout in second tab, it will display error page
    - user open two tab, user login in first tab using username A1, when user login is second tab using username B2, then profile in first tab change to B2\
    - change font color
    - if user sign up, user can login but there is error in dashboard page
      - because new user does not have data in setting table that is used in dashboard

### day 17
- ~add loading in login~
- ~add loading in dashbaord screen~

### day 16
- ~add login as guest in BE and FE~
- ~update style login~
  - update font color for login and login as guest
- add loading screen in login

#### Day 15
- listing bugs from production 

##### Day 14
- ~dashboard~
  - fix responsive navbar
  - fix responsive main content
- ~setting~
  - fix responsive main content
- ~profile~
  - fix responsive main content

issue and solution
-

---
##### Day 13
- ~dashboard~
  - fix style in bottom
  - fix style in air condition
  - fix style in next day forecast
  - fix style in today forecast

issue and solution
- current 6 hour only display 5hour?
  - just add(+) 2 hour in next 6hour function

---
##### Day 12
- ~profile~
  - fit bottom style
  - fit profile component position
  - update color input "city"
- ~add active menu in navbar~
- ~fix background color to full page in every menu~
- ~fix navbar~
  - fix width
  - fix height
- ~setting~
  - fix bottom style
  - add style for setting main component
  - add city based on available city in API
  - REMOVE dark mode
  - add celcius/fahrenheit symbol do dropdown
- dashboard
  - fix style in bottom
  - fix style in air condition
  - fix style in next day forecast
  - fix style in today forecast
  - fix responsive
- update later
  - font color for login/signup, change it to white
  - in dashboard
    - update today forecast and next dat forecast so it will display next +6 hour forecast and next 7 day forecast
    - update degree to fahrenheit if user set it in setting
    - update display country/region just below city name
    - in today forecast, there is bug that it will not show time after 23:00
    - add new paramter in air condition
  - in settings
    - add background color like in dashboard
    - add using kmh or mph
  - in profile
    - add background color like in dashboard
  - add dummy response to minimize call API weather
  - add loading weather in each component when frontend waiting API data
  - REMOVE component/input

issue and solution
  - 

---
##### Day 11:
- ~update style/code login/sign up page~
  - add backgroung image for login/sign up page
  - add new words to general const
  - udpate some color based on color palete bg image
  - fix error when empty login/signup form is submitted
  - add wrong username/password notifications
- analyses what think can be improve
  - add active menu in navbar
  - dashboard
    - fix style in bottom
    - fix style in air condition
    - fix style in next day forecast
    - fix style in today forecast
    - fix responsive
  - setting
    - fix bottom style
    - add style for setting main component
    - add city based on available city in API
    - REMOVE dark mode
    - add celcius/fahrenheit symbol do dropdown
  - profile
    - fit bottom style
    - fit profile component position
    - update color input "city"

Issue and solution
- 

---
##### Day 10 goal:
- make profile work
  - create backend API to update and get data
  - make fecth method to get data from api and display it
  - make username and email can be update by submit button
- running TOKEN authentication
  
Issue and solution
- how to comnbine two serializer?
  - simple answer by just return data with two serializer (https://stackoverflow.com/a/45415165)

--- 
##### Day 9 goal:
- understand the weather api
- migrate from fontawesopme icon to weather app icon
  - the example already in dashboard
  - make it dynamic
- make city and temperature scale work
  
Issue and solution
- onChange select not always updated?
  - need to force select defautl value updated manually
- hopw to get user information based on token?
  - by get token first and then using this token data to user data from library
---
##### Day 8 goal:
- make api for settting
  
Issue and solution
- can get data setting from DB, it get exceptions
  - fix by change seting model name from "setting" to "settingModel"
- 

---
##### Day 7 goal:
- understand the weather api
- start display next 7 day forecast
  - display next day forecast in exact time as today

Issue and solution
- 

---
##### Day 6 goal:
- understand the weather api
- start display today forecast
  - display hour based on response from API not from local browser time
- start display next 7 day forecast

Issue and solution
- do weather API using utc for time key?
- issue in making vlaue between hour today forecast
- isue why data from usestate is empty

---
##### Day 5 goal:
- understand the weather api
- start working on simple UI  profile, and settings
- 

Issue and solution
- None
  
---
##### Day 4 goal:
- understand the weather api
- start working on UI only fo dashboard based on ref picture


Issue and solution
- https://stackoverflow.com/a/10797856

---
##### Day 3 goal:
- check what paged are needed and then create it
  - page dashboard
    - next 7- day forecast component
    - today all day long forecast component
    - main componentn -> display choosen city, display icon weather, display temperature
    - air condition component
  - page settings
    - chooses using celcisius or fahrenheit
    - choose permanent city for user
    - enable darkmode
  - page profile
    - change photo profile
    - change biodata
  - use #030637 as background color
- user can see current weather based on location and forecasted it too
- understand the weather api


Issue and solution
- None

---
##### Day 2 goal:
- fix issue in git ignore when created new init
- update Readme
- create new view to handle weather API
- Init frontend and implement token auth/autho
- Read again the requirement and make next goal

> Feature "User Authentication" DONE

Issue and solution

- https://stackoverflow.com/a/19757964
- https://stackoverflow.com/a/14617309
- https://reintech.io/blog/connecting-to-external-api-in-django

---
##### Day 1 goal:
- create backend
- create Log In, Sign Up, and Log Out with token auth/autho
