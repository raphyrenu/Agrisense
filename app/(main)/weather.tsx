import { View, TouchableOpacity, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherHeader from '../components/weather/WeatherHeader';
import DaySelector from '../components/weather/DaySelector';
import HourlyForecast from '../components/weather/HourlyForecast';
import Metars from '../components/weather/Metars';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = '4a681263221d7d234ffedd87dc199cab'; // Replace with your OpenWeather API key
const LAT = -1.9536; // Latitude for Kigali, Rwanda
const LON = 30.0605; // Longitude for Kigali, Rwanda

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
  });
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load fonts
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        ...Ionicons.font,
      });
    };
    loadFonts();
  }, []);

  // Fetch weather data
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 10000)
      );

      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

      const [currentResponse, forecastResponse] = await Promise.all([
        Promise.race([axios.get(currentWeatherUrl), timeoutPromise]),
        Promise.race([axios.get(forecastUrl), timeoutPromise]),
      ]);

      const currentData = currentResponse.data;
      const forecastData = forecastResponse.data.list;

      setWeatherData({
        temp: `${Math.round(currentData.main.temp)}°C`,
        wind: `${currentData.wind.speed} km/h`,
        humidity: `${currentData.main.humidity}%`,
        pressure: `${currentData.main.pressure} mb`,
        visibility: `${(currentData.visibility / 1000).toFixed(1)} km`,
        condition: currentData.weather[0].main.toLowerCase(),
      });

      const hourlyData = forecastData.map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: `${Math.round(item.main.temp)}°C`,
        icon: mapWeatherConditionToIcon(item.weather[0].main),
        isNow: new Date(item.dt * 1000).getHours() === new Date().getHours(),
      }));
      setHourlyForecast(hourlyData);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const mapWeatherConditionToIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'sunny-outline';
      case 'clouds':
        return 'cloudy-outline';
      case 'rain':
        return 'rainy-outline';
      case 'thunderstorm':
        return 'thunderstorm-outline';
      case 'snow':
        return 'snow-outline';
      default:
        return 'partly-sunny-outline';
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleGetRecommended = () => {
    const weekForecast = JSON.stringify([
      {
        day: 'Monday',
        temp: weatherData.temp,
        wind: weatherData.wind,
        humidity: weatherData.humidity,
        pressure: weatherData.pressure,
        visibility: weatherData.visibility,
        condition: weatherData.condition,
        icon: 'sunny-outline',
      },
    ]);

    router.push({
      pathname: '/(main)/forecast',
      params: {
        ...weatherData,
        weekForecast,
        date: selectedDate.toISOString(),
      },
    });
  };

  if (loading) {
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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#E7F4EA]">
      <ScrollView className="flex-1">
        <WeatherHeader selectedDate={selectedDate} temperature={weatherData.temp} condition={weatherData.condition} />
        <DaySelector selectedDate={selectedDate} onSelectDate={handleDateChange} />
        <HourlyForecast hourlyData={hourlyForecast} />
        <Metars />

        <TouchableOpacity
          className="bg-[#0B4D26] mx-4 p-4 rounded-lg mb-6 mt-8"
          onPress={handleGetRecommended}
        >
          <Text className="text-white text-center font-medium">Get recommended</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}