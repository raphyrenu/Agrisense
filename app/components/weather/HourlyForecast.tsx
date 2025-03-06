import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

interface HourlyForecastData {
    time: string;
    temp: string;
    icon: keyof typeof Ionicons.glyphMap;
    isNow: boolean;
}

interface HourlyForecastProps {
    hourlyData: HourlyForecastData[];
}

export default function HourlyForecast({ hourlyData }: HourlyForecastProps) {
    const scrollViewRef = useRef<ScrollView>(null);

    // Scroll to current hour when component mounts
    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();

        setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                x: currentHour * 88,
                animated: false,
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
                    paddingVertical: 20,
                }}
                snapToInterval={88}
                decelerationRate="fast"
            >
                {hourlyData.map((hour, index) => (
                    <View key={index} style={{ transform: [{ translateY: hour.isNow ? -15 : 0 }], marginHorizontal: 8 }}>
                        <View
                            className={`rounded-[30px] ${hour.isNow ? 'bg-white' : 'bg-[#D3E7D8]'}`}
                            style={{
                                width: 75,
                                height: 180,
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: hour.isNow ? 8 : 0 },
                                shadowOpacity: hour.isNow ? 0.15 : 0,
                                shadowRadius: hour.isNow ? 12 : 0,
                                elevation: hour.isNow ? 10 : 0,
                            }}
                        >
                            <Text className="text-[#0B4D26] mb-6" style={{ fontSize: 16, fontWeight: '500' }}>
                                {hour.isNow ? 'Now' : hour.time}
                            </Text>
                            <Ionicons name={hour.icon} size={32} color="#0B4D26" style={{ marginBottom: 16 }} />
                            <Text className="text-[#0B4D26]" style={{ fontSize: 18, fontWeight: '500' }}>
                                {hour.temp}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}