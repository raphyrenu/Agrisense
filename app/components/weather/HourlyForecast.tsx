import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

// Define the type for each hour entry
interface HourlyForecastData {
    time: string;
    temp: string;
    icon: keyof typeof Ionicons.glyphMap; // Ensuring valid Ionicon names
    isNow: boolean;
}

interface HourlyForecastProps {
    selectedDate: Date;
}

export default function HourlyForecast({ selectedDate }: HourlyForecastProps) {
    const scrollViewRef = useRef<ScrollView>(null);

    const generateHours = (): HourlyForecastData[] => {
        const hours: HourlyForecastData[] = [];
        const now = new Date();
        const currentHour = now.getHours();

        for (let i = 0; i < 24; i++) {
            const hour = new Date(now);
            hour.setHours(i);
            hour.setMinutes(0);

            let timeStr = (hour.getHours() % 12 || 12) + (hour.getHours() >= 12 ? 'pm' : 'am');

            hours.push({
                time: timeStr, // Explicitly a string
                temp: '29', // Keeping temperature as a string for consistency
                icon: (i === currentHour + 2 ? 'cloud-outline' : 'sunny-outline') as keyof typeof Ionicons.glyphMap,
                isNow: i === currentHour
            });
        }
        return hours;
    };

    const hours = generateHours();

    // Scroll to current hour when component mounts
    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();

        setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                x: currentHour * 88, // Adjusted for increased spacing
                animated: false
            });
        }, 100);
    }, []);

    return (
        <View className="mt-8">
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 20 // Increased to accommodate higher elevation
                }}
                snapToInterval={88} // Adjusted for card width + new margin
                decelerationRate="fast"
            >
                {hours.map((hour, index) => (
                    <View
                        key={index}
                        style={{
                            transform: [{ translateY: hour.isNow ? -15 : 0 }], // Increased elevation
                            marginHorizontal: 8, // Increased spacing between items
                        }}
                    >
                        <View
                            className={`rounded-[30px] ${
                                hour.isNow ? 'bg-white' : 'bg-[#D3E7D8]'
                            }`}
                            style={{
                                width: 75,
                                height: 180,
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: hour.isNow ? 8 : 0, // Increased shadow offset
                                },
                                shadowOpacity: hour.isNow ? 0.15 : 0, // Increased shadow opacity
                                shadowRadius: hour.isNow ? 12 : 0, // Increased shadow radius
                                elevation: hour.isNow ? 10 : 0, // Increased elevation
                            }}
                        >
                            <Text
                                className="text-[#0B4D26] mb-6"
                                style={{ fontSize: 16, fontWeight: '500' }}
                            >
                                {hour.isNow ? 'Now' : hour.time}
                            </Text>
                            <Ionicons
                                name={hour.icon}
                                size={32}
                                color="#0B4D26"
                                style={{ marginBottom: 16 }}
                            />
                            <Text
                                className="text-[#0B4D26]"
                                style={{ fontSize: 18, fontWeight: '500' }}
                            >
                                {hour.temp}°C
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
