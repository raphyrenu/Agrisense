import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function SoilDetection() {
    const router = useRouter();
    const screenWidth = Dimensions.get('window').width;

    const handleStartDetection = () => {
        router.push('/SoilDetectionProcess');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Main Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 items-center px-6">
                    {/* Oval Image Container */}
                    <View
                        className="w-full aspect-[4/5] mb-8 overflow-hidden"
                        style={{
                            borderRadius: screenWidth * 0.5,
                            maxWidth: screenWidth - 48, // 24px padding on each side
                        }}
                    >
                        <Image
                            source={require('../assets/soil-detection-image.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    {/* Text Content */}
                    <View className="w-full">
                        <Text className="text-2xl font-semibold mb-3">
                            Start your <Text className="text-[#0B4D26]">soil</Text> detection
                        </Text>
                        <Text className="text-gray-600 text-base mb-8">
                            Detect soil type, pH, moisture, nutrients, and other properties
                            to get recommended about what to do
                        </Text>
                    </View>

                    {/* Button */}
                    <TouchableOpacity
                        onPress={handleStartDetection}
                        className="bg-[#0B4D26] w-full py-4 rounded-xl"
                    >
                        <Text className="text-white text-center text-lg font-medium">
                            Start now
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
