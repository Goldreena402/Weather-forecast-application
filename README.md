# Weather Forecast Application

A modern, feature-rich weather forecasting web application built with React, featuring real-time weather data, 5-day forecasts, and dynamic theming based on weather conditions.

## Features

### Core Features
- **Current Weather Display**: Real-time weather data including temperature, humidity, wind speed, and pressure
- **City Search**: Search weather by city name
- **5-Day Forecast**: Detailed 5-day weather forecast with daily summaries
- **Hourly Forecast**: Hour-by-hour weather breakdown with temperature trend chart

### Advanced Features
- **Unit Toggle**: Switch between Celsius (°C) and Fahrenheit (°F)
- **Geolocation**: Get weather for your current location with one click
- **Favorites System**: Save and manage your favorite cities (persists across sessions)
- **Dynamic Themes**: Background changes based on weather conditions (clear, rain, snow, etc.)
- **Loading Skeletons**: Smooth loading states with animated skeletons
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices



- **Frontend Framework**: React 18+ with Hooks
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Date Handling**: Day.js
- **Charts**: Recharts
- **Icons**: React Icons
- **API**: OpenWeatherMap API

## Project Structure

```
weather-forcast/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CurrentWeather.jsx
│   │   ├── ForecastCard.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── SearchBar.jsx
│   │   ├── UnitToggle.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── FavoritesList.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   └── ErrorMessage.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Forecast.jsx
│   │   └── Favorites.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useWeather.js
│   │   ├── useFavorites.js
│   │   └── useGeolocation.js
│   ├── utils/               # Utility functions
│   │   ├── weatherThemes.js
│   │   ├── dateFormatter.js
│   │   └── apiHelpers.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/
├── .env.example             # Environment variables template
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (free)

### Step 1: Clone or Navigate to Project
```bash
cd /Users/mac/Documents/YTS/RKDFInternship/weather-forcast
```

### Step 2: Install Dependencies
Dependencies are already installed. If you need to reinstall:
```bash
npm install
```

### Step 3: Get OpenWeatherMap API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "API keys" in your account
4. Copy your API key

### Step 4: Configure Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` file and add your API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

### Step 5: Run the Application
```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Step 6: Build for Production
```bash
npm run build
```

The production build will be in the `dist` folder.

## Usage Guide

### Home Page
1. **Search for a City**: Enter a city name in the search bar and click "Search"
2. **Use Current Location**: Click the location icon button to get weather for your current location
3. **Toggle Units**: Switch between °C and °F using the unit toggle in the header
4. **Add to Favorites**: Click the heart icon to save the current city to favorites

### Forecast Page
1. Navigate to the Forecast page using the navigation menu
2. View the 5-day forecast with daily summaries
3. Click on any day to see hourly breakdown with temperature chart
4. View detailed hourly information and trends

### Favorites Page
1. Navigate to the Favorites page to see all saved cities
2. Click on any city to view its weather (redirects to Home page)
3. Remove cities from favorites using the trash icon

## API Rate Limits

OpenWeatherMap Free Tier:
- 60 calls per minute
- 1,000,000 calls per month
- Access to current weather and 5-day forecast

## Features in Detail

### Dynamic Weather Themes
The app automatically changes its background gradient based on current weather conditions:
- **Clear**: Blue gradient
- **Clouds**: Gray gradient
- **Rain**: Dark blue-gray gradient
- **Snow**: Light blue gradient
- **Thunderstorm**: Dark purple gradient
- And more...

### Favorites System
- Saved to browser's LocalStorage
- Persists across sessions
- Quick access to frequently checked cities
- Case-insensitive duplicate prevention

### Error Handling
Handles various error scenarios:
- Invalid city names
- Network failures
- API rate limits
- Geolocation permission denied
- API key issues

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Responsive navigation

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### "City not found" error
- Check spelling of city name
- Try adding country code (e.g., "London, UK")

### API key errors
- Verify your API key is correctly set in `.env`
- Ensure the key is active (new keys may take a few minutes)
- Check you haven't exceeded rate limits

### Geolocation not working
- Enable location permissions in your browser
- Use HTTPS or localhost (geolocation requires secure context)

### Build errors
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

## Performance Optimization
- Lazy loading for components
- Debounced API calls
- Cached weather data
- Optimized images and icons
- Minimal bundle size

## Security Notes
- Never commit `.env` file to version control
- API key is exposed in browser (use backend proxy for production)
- Rate limiting implemented to prevent abuse

## Future Enhancements
- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Air quality index
- [ ] Weather maps and radar
- [ ] Multiple language support
- [ ] Dark/light mode toggle
- [ ] PWA support for offline access
- [ ] Weather widgets

## Contributing
This is a learning project. Feel free to fork and experiment!

## License
MIT License - Free to use and modify

## Credits
- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Charts: [Recharts](https://recharts.org/)

## Contact & Support
For issues or questions, please refer to the OpenWeatherMap API documentation or React documentation.

---

**Built with ❤️ using React + Vite + TailwindCSS**
