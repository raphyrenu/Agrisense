import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VerifyEmail() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState<string>('raphyboy@gmail.com'); // Default email
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

    useEffect(() => {
        // Get the email from the router params
        const emailParam = router.query?.email as string;
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [router.query?.email]);

    const handleVerify = () => {
        if (code.length !== 4) {
            setError('Please enter a valid 4-digit code');
            return;
        }

        // Simulate verification logic
        if (code === '1234') { // Replace '1234' with the actual verification logic
            setModalVisible(true); // Show the modal on successful verification
        } else {
            setError('Invalid verification code');
        }
    };

    const handleResendCode = () => {
        // Logic to resend the verification code
        alert('Verification code resent!');
    };

    const handleChangeEmail = () => {
        // Redirect to sign-in page when changing email
        router.push('/signin');
    };

    const handleContinue = () => {
        setModalVisible(false); // Close the modal
        router.push('/SoilDetection'); // Navigate to the dashboard
    };

    return (
        <SafeAreaView className="flex-1 bg-white pt-6">
            <ScrollView className="flex-1 px-4">
                <TouchableOpacity onPress={() => router.back()} className="mt-2 p-2">
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <View className="mt-4">
                    <Text className="text-2xl font-bold">Verify your email</Text>
                    <Text className="text-gray-500 mt-2">
                        Please enter the 4-digit code sent to {email}
                    </Text>
                </View>

                <View className="items-center justify-center my-8">
                    <Image
                        source={require('../assets/verification-illustration.png')} // Add your illustration image
                        className="w-64 h-64"
                        resizeMode="contain"
                    />
                </View>

                <View className="space-y-4">
                    <View>
                        <TextInput
                            placeholder="Enter 4-digit code"
                            value={code}
                            onChangeText={setCode}
                            className={`bg-gray-100 p-4 rounded-lg ${error ? 'border-red-500 border' : ''}`}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                        {error ? <Text className="text-red-500 text-sm mt-1">{error}</Text> : null}
                    </View>

                    <TouchableOpacity
                        onPress={handleResendCode}
                        className="items-end"
                    >
                        <Text className="text-[#0B4D26] text-sm">Resend code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleVerify}
                        className="bg-[#0B4D26] p-4 rounded-lg mt-4"
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            Confirm
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleChangeEmail}
                        className="mt-4"
                    >
                        <Text className="text-[#0B4D26] text-sm">Change email</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <View className="bg-white p-6 rounded-lg shadow-lg">
                        <Text className="text-xl font-bold">Verified!</Text>
                        <Text className="mt-2 text-gray-600">Great! You have successfully verified the account.</Text>
                        <TouchableOpacity
                            onPress={handleContinue}
                            className="bg-[#0B4D26] p-4 rounded-lg mt-4"
                        >
                            <Text className="text-white text-center font-semibold">Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
