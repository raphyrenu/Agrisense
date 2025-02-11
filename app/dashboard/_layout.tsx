import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <View className="flex-1 flex-row bg-white">
            {isSidebarOpen && <Sidebar />}
            <View className={`flex-1 ${isSidebarOpen ? 'ml-64' : ''}`}>
                <Header onMenuPress={toggleSidebar} />
                <Stack screenOptions={{ headerShown: false }} />
            </View>
        </View>
    );
}
