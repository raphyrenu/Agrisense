import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DeviceConnection() {
    const router = useRouter();

    const handleStartSensor = () => {
        // Logic to start the sensor
        alert('Starting sensor...');
        // You can implement the actual sensor logic here
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-4">
                <TouchableOpacity onPress={() => router.back()} className="mb-4">
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <View className="flex-row items-center justify-between">
                    <Text className="text-xl font-bold">Device Connection</Text>
                    <Ionicons name="person-circle-outline" size={24} color="#0B4D26" />
                </View>

                <View className="mt-4">
                    <Image
                        source={require('../assets/device.png')}
                        className="w-full h-24 rounded-lg"
                        resizeMode="cover"
                    />
                </View>

                <View className="mt-6">
                    <Text className="text-lg font-semibold">Paired Devices</Text>
                    <Text className="text-gray-600">BMP280 <Text className="text-green-500">● connected</Text></Text>
                </View>

                <View className="mt-4">
                    <Text className="text-lg font-semibold">Available Devices</Text>
                    {['BMP280', 'DS18B20', 'MPU9250', 'BMP280', 'TCS34725'].map((device, index) => (
                        <View key={index} className="flex-row justify-between items-center p-2 border-b border-gray-200">
                            <Text>{device}</Text>
                            <TouchableOpacity className="text-[#0B4D26]">
                                <Text>connect</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    onPress={handleStartSensor}
                    className="bg-[#0B4D26] p-4 rounded-lg mt-6"
                >
                    <Text className="text-white text-lg font-semibold text-center">Start Sensor</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
