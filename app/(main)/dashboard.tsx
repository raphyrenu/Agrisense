import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Dashboard() {
    const router = useRouter();

    const handleSoilDetection = () => {
        router.push('../SoilDetection');
    };

    return (
        <View className="flex-1 bg-white">
            <TouchableOpacity
                onPress={handleSoilDetection}
                className="flex-row items-center p-4 bg-white rounded-xl shadow-sm"
            >
                <Image
                    source={require('../../assets/crop-image.png')}
                    className="w-12 h-12"
                />
                <View className="ml-4">
                    <Text className="text-lg font-semibold text-[#0B4D26]">
                        Soil Detection
                    </Text>
                    <Text className="text-gray-600">
                        Check your soil condition
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
