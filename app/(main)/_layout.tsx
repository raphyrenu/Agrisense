import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Slot, useRouter } from 'expo-router';

const menuItems = [
    { icon: 'grid-outline', label: 'Dashboard', route: '/(main)/dashboard' },
    { icon: 'analytics-outline', label: 'Analytics', route: '/(main)/analytics' },
    { icon: 'leaf-outline', label: 'Harvest', route: '/(main)/harvest' },
    { icon: 'calendar-outline', label: 'Schedule', route: '/(main)/schedule' },
    { icon: 'star-outline', label: 'Recommends', route: '/(main)/recommends' },
    { icon: 'cloudy-outline', label: 'Weather', route: '/(main)/weather' },
    { icon: 'scan-outline', label: 'Soil detects', route: '/(main)/soil-detects' },
    { icon: 'people-outline', label: 'Community', route: '/(main)/community' },
    { icon: 'settings-outline', label: 'Settings', route: '/(main)/settings' },
];

export default function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const [activeRoute, setActiveRoute] = useState('/(main)/community');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Main Content */}
            <View className="flex-1">
                {/* Content Area */}
                <View className="flex-1 bg-white">
                    <Slot />
                </View>

                {/* Bottom Navigation */}
                <View className="flex-row justify-around py-4 border-t border-gray-200 bg-white">
                    <TouchableOpacity>
                        <Ionicons name="home-outline" size={24} color="#4B5563" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="person-outline" size={24} color="#4B5563" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#0B4D26] p-3 rounded-full -mt-8">
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="chatbubble-outline" size={24} color="#4B5563" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={24} color="#4B5563" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Sidebar Modal */}
            <Modal
                visible={isSidebarOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleSidebar}
            >
                <View className="flex-1 bg-black/50">
                    <View className="w-72 h-full bg-white">
                        {/* Profile Section */}
                        <View className="p-4 flex-row items-center border-b border-gray-200">
                            <Image
                                source={require('../../assets/profile-pic.png')}
                                className="w-10 h-10 rounded-full"
                            />
                            <View className="ml-3">
                                <Text className="text-sm">Good Day👋</Text>
                                <Text className="font-semibold">Nelson IRASIBIZA</Text>
                            </View>
                        </View>

                        {/* Menu Items */}
                        <ScrollView className="flex-1">
                            {menuItems.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setActiveRoute(item.route);
                                        router.push(item.route);
                                        toggleSidebar();
                                    }}
                                    className={`flex-row items-center p-4 space-x-3
                                        ${activeRoute === item.route ? 'bg-[#0B4D26]/10' : ''}`}
                                >
                                    <Ionicons
                                        name={item.icon as any}
                                        size={24}
                                        color={activeRoute === item.route ? '#0B4D26' : '#4B5563'}
                                    />
                                    <Text
                                        className={`${
                                            activeRoute === item.route
                                                ? 'text-[#0B4D26] font-medium'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Go Back Button */}
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="flex-row items-center p-4 border-t border-gray-200"
                        >
                            <Ionicons name="arrow-back-outline" size={24} color="#4B5563" />
                            <Text className="ml-3 text-gray-600">Go back</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        className="flex-1"
                        onPress={toggleSidebar}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
}
