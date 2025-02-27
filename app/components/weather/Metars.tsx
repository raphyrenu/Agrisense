import { View, Text } from 'react-native';

export default function Metars() {
    const weatherTypes = [
        { type: 'sunny', color: '#0B4D26' },
        { type: 'cloudy', color: '#0B4D26' },
        { type: 'drizzle', color: '#0B4D26' },
        { type: 'rainy', color: '#0B4D26' },
        { type: 'heavy rain', color: '#0B4D26' }
    ];

    const timeLabels = ['6AM', '7AM', '8AM', '9AM', '10AM'];

    // Each array represents a time slot and contains objects with type and width
    const weatherData = [
        [{ type: 'cloudy', width: 80 }],
        [{ type: 'sunny', width: 30 }],
        [{ type: 'drizzle', width: 15 }],
        [{ type: 'rainy', width: 60 }],
        [{ type: 'sunny', width: 100 }]
    ];

    return (
        <View className="bg-white rounded-[32px] mx-4 mt-8 p-6">
            <Text className="text-xl font-semibold text-[#0B4D26] mb-6">
                METARs
            </Text>

            <View>
                {/* Weather type labels and bars */}
                {weatherTypes.map((item, typeIndex) => (
                    <View key={typeIndex} className="flex-row items-center mb-4">
                        <Text className="text-[#0B4D26] text-[15px] w-[100px]">
                            {item.type}
                        </Text>
                        <View className="flex-1 flex-row h-3">
                            {weatherData.map((timeSlot, timeIndex) => (
                                <View key={timeIndex} className="flex-1">
                                    {timeSlot.map((weather, weatherIndex) => (
                                        weather.type === item.type && (
                                            <View
                                                key={weatherIndex}
                                                style={{
                                                    width: `${weather.width}%`,
                                                    height: 8,
                                                    backgroundColor: '#0B4D26',
                                                    borderRadius: 2
                                                }}
                                            />
                                        )
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Time labels */}
                <View className="flex-row mt-2 pl-[100px]">
                    {timeLabels.map((time, index) => (
                        <Text
                            key={index}
                            className="flex-1 text-[#0B4D26] text-[13px]"
                        >
                            {time}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
}
