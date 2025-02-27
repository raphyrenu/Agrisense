import { View, TouchableOpacity, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '../../utils/dateUtils';
import { useState, useEffect, useRef } from 'react';

interface DaySelectorProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

export default function DaySelector({ selectedDate, onSelectDate }: DaySelectorProps) {
    const scrollViewRef = useRef<ScrollView>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const generateDays = () => {
        const days = [];
        const today = new Date();
        for (let i = -7; i <= 7; i++) {
            const day = new Date(today);
            day.setDate(day.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const days = generateDays();
    const todayIndex = days.findIndex(day => day.toDateString() === new Date().toDateString());

    // Set initial selection to today and scroll to it when component mounts
    useEffect(() => {
        const today = new Date();
        onSelectDate(today);

        setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                x: todayIndex * 120,
                animated: false,
            });
        }, 100);
    }, []);

    const currentDayIndex = days.findIndex(day => day.toDateString() === selectedDate.toDateString());

    const handlePrevDay = () => {
        if (currentDayIndex > 0) {
            onSelectDate(days[currentDayIndex - 1]);
            scrollViewRef.current?.scrollTo({
                x: (currentDayIndex - 1) * 120,
                animated: true,
            });
        }
    };

    const handleNextDay = () => {
        if (currentDayIndex < days.length - 1) {
            onSelectDate(days[currentDayIndex + 1]);
            scrollViewRef.current?.scrollTo({
                x: (currentDayIndex + 1) * 120,
                animated: true,
            });
        }
    };

    // Effect to center the selected day
    useEffect(() => {
        if (scrollViewRef.current && !isScrolling) {
            scrollViewRef.current.scrollTo({
                x: currentDayIndex * 120,
                animated: true,
            });
        }
    }, [selectedDate, currentDayIndex]);

    const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        setIsScrolling(false);
        const offsetX = event.nativeEvent.contentOffset.x;
        const nearestIndex = Math.round(offsetX / 120);
        if (nearestIndex >= 0 && nearestIndex < days.length) {
            onSelectDate(days[nearestIndex]);
        }
    };

    return (
        <View className="flex-row items-center justify-center px-4 mt-8">
            <TouchableOpacity onPress={handlePrevDay} className="p-2">
                <Ionicons name="chevron-back" size={24} color="#0B4D26" />
            </TouchableOpacity>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-1"
                onScrollBeginDrag={() => setIsScrolling(true)}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                pagingEnabled={true}
                snapToInterval={120}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: 40 }}
            >
                <View className="flex-row justify-center">
                    {days.map((day, index) => {
                        const isToday = day.toDateString() === new Date().toDateString();
                        const isSelected = day.toDateString() === selectedDate.toDateString();

                        let dayText = isToday ? 'Today' :
                            index === currentDayIndex - 1 ? 'Yesterday' :
                            index === currentDayIndex + 1 ? 'Tomorrow' :
                            formatDate(day).dayName;

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    onSelectDate(day);
                                    scrollViewRef.current?.scrollTo({
                                        x: index * 120,
                                        animated: true,
                                    });
                                }}
                                className={`px-6 py-2 mx-1 rounded-full ${
                                    isSelected ? 'bg-[#0B4D26]' : 'bg-[#D3E7D8]'
                                }`}
                                style={{ width: 120 }}
                            >
                                <Text className={`${
                                    isSelected ? 'text-white' : 'text-[#0B4D26]'
                                } font-medium text-center`}>
                                    {dayText}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <TouchableOpacity onPress={handleNextDay} className="p-2">
                <Ionicons name="chevron-forward" size={24} color="#0B4D26" />
            </TouchableOpacity>
        </View>
    );
}
