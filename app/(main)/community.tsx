import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Post {
    id: string;
    author: string;
    timeAgo: string;
    content: string;
    image: any;
    comments: number;
    shares: number;
    likes: number;
}

export default function Community() {
    const router = useRouter();
    const posts: Post[] = [
        {
            id: '1',
            author: 'Kayitare Andrew',
            timeAgo: '1 hour',
            content: 'Attention farmers! ⚠️ My crops were recently affected by [pest name]. It caused [specific damage], like [effects on crops]. Be vigilant and take preventive measures like [solution/treatment]. Let\'s share tips to fight this together 💪🌱',
            image: require('../../assets/crop-image.png'),
            comments: 128,
            shares: 64,
            likes: 480
        },
        {
            id: '2',
            author: 'Kayitare Andrew',
            timeAgo: '1 hour',
            content: 'Attention farmers! ⚠️ My crops were recently affected by [pest name]. It caused [specific damage], like [effects on crops]. Be vigilant and take preventive measures like [solution/treatment]. Let\'s share tips to fight this together 💪🌱',
            image: require('../../assets/crop-image.png'),
            comments: 128,
            shares: 64,
            likes: 480
        }
    ];

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="flex-row items-center px-4 pt-2 pb-2 bg-white">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-[17px] font-semibold text-[#0B4D26]">
                    Farming Community
                </Text>
                <TouchableOpacity className="p-2">
                    <Ionicons name="ellipsis-horizontal-circle-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="px-4 py-2 bg-white">
                <View className="flex-row items-center bg-[#F5F5F5] rounded-lg px-4">
                    <TextInput
                        placeholder="Search.."
                        className="flex-1 py-2.5 text-[15px]"
                        placeholderTextColor="#666"
                    />
                    <TouchableOpacity>
                        <Ionicons name="search" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Posts List */}
            <ScrollView className="flex-1">
                {posts.map((post) => (
                    <View key={post.id} className="bg-white mb-3">
                        {/* Post Header */}
                        <View className="px-4 py-3 flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <Image
                                    source={require('../../assets/profile-pic.png')}
                                    className="w-[42px] h-[42px] rounded-full"
                                />
                                <View className="ml-3">
                                    <Text className="font-semibold text-[15px]">{post.author}</Text>
                                    <Text className="text-gray-500 text-[13px]">{post.timeAgo}</Text>
                                </View>
                            </View>
                            <TouchableOpacity className="p-1">
                                <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {/* Post Content */}
                        <Text className="px-4 mb-3 text-[14px] leading-5">
                            {post.content}
                        </Text>

                        {/* Post Image */}
                        <Image
                            source={post.image}
                            className="w-full h-[200px]"
                            resizeMode="cover"
                        />

                        {/* Engagement Info */}
                        <View className="px-4 py-2 flex-row justify-between items-center">
                            <View className="flex-row items-center">
                                <View className="flex-row items-center">
                                    <Image
                                        source={require('../../assets/profile-pic.png')}
                                        className="w-[22px] h-[22px] rounded-full border-2 border-white"
                                    />
                                    <Image
                                        source={require('../../assets/profile-pic.png')}
                                        className="w-[22px] h-[22px] rounded-full border-2 border-white -ml-2"
                                    />
                                </View>
                                <Text className="ml-2 text-[13px] text-gray-600">{post.likes}</Text>
                            </View>
                            <View className="flex-row items-center space-x-3">
                                <Text className="text-[13px] text-gray-600">
                                    {post.comments} comments
                                </Text>
                                <Text className="text-[13px] text-gray-600">
                                    {post.shares} share
                                </Text>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View className="flex-row justify-between px-4 py-1 border-t border-gray-100">
                            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2">
                                <Ionicons name="thumbs-up-outline" size={18} color="#666" />
                                <Text className="ml-2 text-[13px] text-gray-600">Like</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2">
                                <Ionicons name="chatbubble-outline" size={18} color="#666" />
                                <Text className="ml-2 text-[13px] text-gray-600">Comment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2">
                                <Ionicons name="share-social-outline" size={18} color="#666" />
                                <Text className="ml-2 text-[13px] text-gray-600">Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
