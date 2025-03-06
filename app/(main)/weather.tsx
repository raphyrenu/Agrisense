import { View, TouchableOpacity, Text, ScrollView, SafeAreaView, ActivityIndicator, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherHeader from '../components/weather/WeatherHeader';
import DaySelector from '../components/weather/DaySelector';
import HourlyForecast from '../components/weather/HourlyForecast';
import Metars from '../components/weather/Metars';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const API_KEY = '4a681263221d7d234ffedd87dc199cab';

export default function Weather() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    temp: '--°C',
    wind: '-- km/h',
    humidity: '--%',
    pressure: '-- mb',
    visibility: '-- km',
    condition: '--',
    location: 'Loading...',
  });
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  // Load fonts
  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync(Ionicons.font);
        setFontsLoaded(true);
      } catch (e) {
        console.error('Font loading error:', e);
      }
    }
    loadFonts();
  }, []);

  // Get user's location
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCoordinates({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
      } catch (e) {
        setError('Failed to get location: ' + e.message);
        // Fallback to Kigali coordinates
        setCoordinates({ lat: -1.9536, lon: 30.0605 });
      }
    })();
  }, []);

  // Fetch weather data
  const fetchWeatherData = async () => {
    if (!coordinates.lat || !coordinates.lon) return;

    try {
      setLoading(true);
      setError(null);

      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`;

      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(currentWeatherUrl, { timeout: 10000 }),
        axios.get(forecastUrl, { timeout: 10000 }),
      ]);

      const currentData = currentResponse.data;
      const forecastData = forecastResponse.data.list;

      setWeatherData({
        temp: `${Math.round(currentData.main.temp)}°C`,
        wind: `${(currentData.wind.speed * 3.6).toFixed(1)} km/h`,
        humidity: `${currentData.main.humidity}%`,
        pressure: `${currentData.main.pressure} mb`,
        visibility: `${(currentData.visibility / 1000).toFixed(1)} km`,
        condition: currentData.weather[0].main.toLowerCase(),
        location: `${currentData.name}, ${currentData.sys.country}`,
      });

      const hourlyData = forecastData.slice(0, 24).map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: `${Math.round(item.main.temp)}°C`,
        icon: mapWeatherConditionToIcon(item.weather[0].main),
        isNow: new Date(item.dt * 1000).getHours() === new Date().getHours(),
      }));
      setHourlyForecast(hourlyData);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError(error.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const mapWeatherConditionToIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    return {
      clear: 'sunny-outline',
      clouds: 'cloudy-outline',
      rain: 'rainy-outline',
      thunderstorm: 'thunderstorm-outline',
      snow: 'snow-outline',
    }[conditionLower] || 'partly-sunny-outline';
  };

  useEffect(() => {
    if (fontsLoaded && coordinates.lat && coordinates.lon) {
      fetchWeatherData();
    }
  }, [fontsLoaded, coordinates, selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleGetRecommended = () => {
    const weekForecast = JSON.stringify([{
      day: 'Today',
      ...weatherData,
      icon: mapWeatherConditionToIcon(weatherData.condition),
    }]);

    router.push({
      pathname: '/(main)/forecast',
      params: {
        ...weatherData,
        weekForecast,
        date: selectedDate.toISOString(),
      },
    });
  };

  if (!fontsLoaded || loading || !coordinates.lat) {
    return (
      <SafeAreaView className="flex-1 bg-[#E7F4EA] justify-center items-center">
        <ActivityIndicator size="large" color="#0B4D26" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#E7F4EA] justify-center items-center">
        <Text className="text-[#0B4D26] text-lg">{error}</Text>
        <TouchableOpacity onPress={fetchWeatherData} className="mt-4">
          <Text className="text-[#0B4D26]">Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#E7F4EA]">
      <ScrollView className="flex-1">
        <WeatherHeader 
          selectedDate={selectedDate} 
          temperature={weatherData.temp} 
          condition={weatherData.condition}
          location={weatherData.location}
        />
        <DaySelector selectedDate={selectedDate} onSelectDate={handleDateChange} />
        <HourlyForecast hourlyData={hourlyForecast} />
        <Metars />
        <TouchableOpacity
          className="bg-[#0B4D26] mx-4 p-4 rounded-lg mb-6 mt-8"
          onPress={handleGetRecommended}
        >
          <Text className="text-white text-center font-medium">Get Recommended</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}