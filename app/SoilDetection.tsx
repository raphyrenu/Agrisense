import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function SoilDetection() {
    const router = useRouter();

    const handleStartDetection = () => {
        // Navigate to the soil detection process screen
        router.push('/SoilDetectionProcess');
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F9F9F9] items-center justify-center">
            <View className="flex-1 items-center justify-center">
                <Image
                    source={require('../assets/soil-detection-image.png')} // Add your soil detection image
                    className="w-64 h-48 rounded-full"
                    resizeMode="cover"
                />
                <Text className="text-2xl font-bold mt-4">Start your soil detection</Text>
                <Text className="text-center text-gray-600 mt-2 px-4">
                    Detect soil type, pH, moisture, nutrients, and other properties to get recommendations about what to do.
                </Text>
                <TouchableOpacity
                    onPress={handleStartDetection}
                    className="bg-[#0B4D26] p-4 rounded-lg mt-6"
                >
                    <Text className="text-white text-lg font-semibold text-center">Start Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
