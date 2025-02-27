import { View, Text } from 'react-native';
import { formatDate } from '../../utils/dateUtils';

interface WeatherHeaderProps {
    selectedDate: Date;
    temperature: string;
}

export default function WeatherHeader({ selectedDate, temperature }: WeatherHeaderProps) {
    if (!(selectedDate instanceof Date)) {
        console.error("selectedDate is not a Date object:", selectedDate);
        return null; // Or handle the error appropriately
    }

    console.log("Date passed to formatDate:", selectedDate, "Type:", typeof selectedDate);

    const { fullDate } = formatDate(selectedDate);

    return (
        <View className="items-center mt-8">
            <Text className="text-2xl font-medium text-[#0B4D26]">
                {selectedDate.toDateString() === new Date().toDateString() ? 'Today' : formatDate(selectedDate).dayName}
            </Text>
            <Text className="text-sm text-[#0B4D26] mt-1">{fullDate}</Text>
            <Text className="text-[100px] leading-[120px] font-light text-[#0B4D26]">
                {temperature}<Text className="text-4xl"></Text>
            </Text>
            <Text className="text-lg text-[#0B4D26]">Kigali, RWANDA</Text>
        </View>
    );
}
