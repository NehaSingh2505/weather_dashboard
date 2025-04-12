# 🌦️ Weather Dashboard App

This is a Real time weather dashboard that shows current weather infrmationo using OpenWeatherMap and GeoDB Cities API. 
Built with React + Bootstrap for UI and Express.js as backend.

---

##  Features

-  Dark/Light mode toggle
-  City autocomplete (GeoDB)
-  Weather card showing temperature , humidity, wind.
-  Recent search history showing  (via localStorage)

---

## 📁 Project Structure

weather_dashboard/
├── client/                 
│   ├── public/           
│   ├── src/                
│   │   ├── components/    
│   │   ├── App.jsx         
│   │   └── main.jsx        
│   ├── .env                
│   └── package.json       
│
├── server/                
│   ├── routes/             
│   ├── server.js          
│   ├── .env                
│   └── package.json       
│
├── .gitignore             
├── README.md              

## Getting started with the project:

- Clone the repository
1. git clone https://github.com/NehaSingh2505/weather-app.git
2. cd weather_dashboard

- Setup Backend
1. cd server
2. npm install
 
- create .env file 
 OPENWEATHER_API_KEY=076586af199dfea68b454710e84d16fd

- node server.js
# or, if using nodemon:
npm run dev

- Setup frontend

cd ../client
npm install

VITE_RAPIDAPI_KEY=ef2a056d5amshacd383971128d71p16483ejsn93250defdd42

- start frontend
npm run dev
