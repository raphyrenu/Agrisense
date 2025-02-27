import { View, TouchableOpacity, Text, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';
import WeatherHeader from '../components/weather/WeatherHeader';
import DaySelector from '../components/weather/DaySelector';
import HourlyForecast from '../components/weather/HourlyForecast';
import Metars from '../components/weather/Metars';
import { useRouter } from 'expo-router';

export default function Weather() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weatherData, setWeatherData] = useState({
        temp: '29°C',
        wind: '15 km/h',
        humidity: '15 km/h',
        pressure: '1080mb',
        visibility: '15 km/h',
        condition: 'sunny'
    });

    const handleDateChange = (newDate: Date) => {
        setSelectedDate(newDate);
        // Update weather data based on selected date
        setWeatherData(prev => ({
            ...prev,
            temp: `${Math.floor(Math.random() * 5) + 24}°C`, // Random temp between 24-29
            condition: ['sunny', 'cloudy', 'rainy', 'partly-cloudy'][Math.floor(Math.random() * 4)]
        }));
    };

    const handleGetRecommended = () => {
        // Convert the weekForecast to a string before passing
        const weekForecast = JSON.stringify([
            {
                day: 'Monday',
                temp: weatherData.temp,
                wind: weatherData.wind,
                humidity: weatherData.humidity,
                pressure: weatherData.pressure,
                visibility: weatherData.visibility,
                condition: weatherData.condition,
                icon: 'sunny-outline'
            },
            {
                day: 'TUE',
                temp: '26°C',
                condition: 'cloudy',
                icon: 'cloudy-outline'
            },
            {
                day: 'WED',
                temp: '24°C',
                condition: 'rainy',
                icon: 'rainy-outline'
            },
            {
                day: 'THU',
                temp: '27°C',
                condition: 'partly-cloudy',
                icon: 'partly-sunny-outline'
            },
            {
                day: 'FRI',
                temp: '29°C',
                condition: 'sunny',
                icon: 'sunny-outline'
            },
            {
                day: 'SAT',
                temp: '25°C',
                condition: 'drizzle',
                icon: 'water-outline'
            },
            {
                day: 'SUN',
                temp: '28°C',
                condition: 'sunny',
                icon: 'sunny-outline'
            }
        ]);

        router.push({
            pathname: '/(main)/forecast',
            params: {
                ...weatherData,
                weekForecast,
                date: selectedDate.toISOString()
            }
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-[#E7F4EA]">
            <ScrollView className="flex-1">
                <WeatherHeader
                    selectedDate={selectedDate}
                    temperature={weatherData.temp}
                />
                <DaySelector
                    selectedDate={selectedDate}
                    onSelectDate={handleDateChange}
                />
                <HourlyForecast selectedDate={selectedDate} />
                <Metars />

                <TouchableOpacity
                    className="bg-[#0B4D26] mx-4 p-4 rounded-lg mb-6 mt-8"
                    onPress={handleGetRecommended}
                >
                    <Text className="text-white text-center font-medium">
                        Get recommended
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
