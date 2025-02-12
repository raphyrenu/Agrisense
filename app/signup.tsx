import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { authApi, type SignupData } from '@/services/api';


export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Invalid email format';
        return '';
    };

    const validatePassword = (password: string) => {
        if (!password) return 'Password is required';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
        if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
        return '';
    };

    const validateUsername = (username: string) => {
        if (!username) return 'Username is required';
        if (username.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores';
        return '';
    };

    const validateForm = () => {
        const newErrors = {
            email: validateEmail(formData.email),
            username: validateUsername(formData.username),
            password: validatePassword(formData.password),
            confirmPassword: formData.password !== formData.confirmPassword ? 'Passwords do not match' : '',
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSignup = async () => {
        if (!validateForm()) return;
        if (!agreeToTerms) {
            alert('Please agree to the Terms and Conditions');
            return;
        }

        try {
            const response = await authApi.signup({
                email: formData.email,
                username: formData.username,
                password: formData.password,
            });

            if (response.success) {
                router.push(`/verifyEmail?email=${encodeURIComponent(formData.email)}`);
            } else {
                alert(response.message || 'Signup failed');
            }
        } catch (error) {
            alert('An error occurred during signup');
            console.error(error);
        }
    };

    const handleBackPress = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white pt-6">
            <ScrollView className="flex-1 px-4">
                <TouchableOpacity
                    onPress={handleBackPress}
                    className="mt-2 p-2"
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <View className="mt-4">
                    <Text className="text-2xl font-bold">Create a new account</Text>
                    <Text className="text-gray-500 mt-2">
                        Creating an account is quick and easy. With your personal account,
                        you'll unlock access to all the features and benefits tailored just for you.
                    </Text>
                </View>

                <View className="mt-6 space-y-4">
                    <View>
                        <TextInput
                            placeholder="Email address"
                            value={formData.email}
                            onChangeText={(text) => setFormData({...formData, email: text})}
                            className="bg-gray-100 p-4 rounded-lg"
                            keyboardType="email-address"
                        />
                        {errors.email ? <Text className="text-red-500 text-sm mt-1">{errors.email}</Text> : null}
                    </View>

                    <View>
                        <TextInput
                            placeholder="Username"
                            value={formData.username}
                            onChangeText={(text) => setFormData({...formData, username: text})}
                            className="bg-gray-100 p-4 rounded-lg"
                        />
                        {errors.username ? <Text className="text-red-500 text-sm mt-1">{errors.username}</Text> : null}
                    </View>

                    <View className="relative">
                        <TextInput
                            placeholder="Password"
                            value={formData.password}
                            onChangeText={(text) => setFormData({...formData, password: text})}
                            secureTextEntry={!showPassword}
                            className="bg-gray-100 p-4 rounded-lg"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4"
                        >
                            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                        </TouchableOpacity>
                        {errors.password ? <Text className="text-red-500 text-sm mt-1">{errors.password}</Text> : null}
                    </View>

                    <View className="relative">
                        <TextInput
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                            secureTextEntry={!showConfirmPassword}
                            className="bg-gray-100 p-4 rounded-lg"
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-4"
                        >
                            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="gray" />
                        </TouchableOpacity>
                        {errors.confirmPassword ? <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text> : null}
                    </View>

                    <View className="flex-row items-center mt-4">
                        <TouchableOpacity
                            onPress={() => setAgreeToTerms(!agreeToTerms)}
                            className="flex-row items-center"
                        >
                            <View className={`w-5 h-5 border rounded mr-2 ${agreeToTerms ? 'bg-[#0B4D26] border-[#0B4D26]' : 'border-gray-300'}`}>
                                {agreeToTerms && <Ionicons name="checkmark" size={18} color="white" />}
                            </View>
                        </TouchableOpacity>
                        <Text className="text-sm text-gray-600">
                            I agree to the{' '}
                            <Text className="text-[#0B4D26]">Terms</Text> and{' '}
                            <Text className="text-[#0B4D26]">Conditions</Text> provided and confirm that
                            I have read and understood the{' '}
                            <Text className="text-[#0B4D26]">Privacy Policy</Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleSignup}
                        className="bg-[#0B4D26] p-4 rounded-lg mt-6"
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            Sign up
                        </Text>
                    </TouchableOpacity>

                    <View className="mt-16 space-y-4">
                        <Text className="text-center text-gray-500">or continue with</Text>

                        <TouchableOpacity className="flex-row items-center justify-center space-x-2 border border-gray-300 p-4 rounded-lg">
                            <AntDesign name="google" size={24} color="#DB4437" />
                            <Text className="text-black font-semibold ml-2">Continue with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center justify-center space-x-2 bg-[#E7EAF4] p-4 rounded-lg">
                            <AntDesign name="facebook-square" size={24} color="#4267B2" />
                            <Text className="text-black font-semibold ml-2">Continue with Facebook</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center mt-6 mb-8">
                        <Text className="text-gray-600">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/signin')}>
                            <Text className="text-[#0B4D26] font-semibold">Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
