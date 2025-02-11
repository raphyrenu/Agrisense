import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentActivity from '@/components/dashboard/RecentActivity';
import WeatherWidget from '@/components/dashboard/WeatherWidget';

export default function Dashboard() {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1 p-4">
                <DashboardStats />
                <View className="flex-row space-x-4">
                    <WeatherWidget />
                    <RecentActivity />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
