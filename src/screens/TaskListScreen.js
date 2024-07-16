import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

const TaskListScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigation = useNavigation();

    const handleCreateTask = () => {
        navigation.navigate('WorkerProfile');
    };

    const carouselData = [
        { image: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?cs=srgb&dl=pexels-sevenstormphotography-439416.jpg&fm=jpg', id: 1 },
        { image: 'https://www.jkcement.com/wp-content/uploads/2023/09/plasterer-hand-rubber-glove-using-wooden-trowel-plastering-cement-brick-wall-background-1-scaled.jpg', id: 2 },
        { image: 'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80', id: 3 },
        { image: 'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80', id: 4 },
    ];

    const taskData = [
        { id: 1, title: 'Forklift Operator', startDate: '24/03/23', endDate: '24/03/23', image: require('./assets/forklit.png') },
        { id: 2, title: 'Cleaner', startDate: '24/03/23', endDate: '24/03/23', image: require('./assets/cleaner.png') },
        { id: 3, title: 'Forklift Operator', startDate: '24/03/23', endDate: '24/03/23', image: 'https://via.placeholder.com/350x150' },
        { id: 4, title: 'Painter', startDate: '24/03/23', endDate: '24/03/23', image: 'https://via.placeholder.com/350x150' },
        { id: 5, title: 'Electrician', startDate: '24/03/23', endDate: '24/03/23', image: 'https://via.placeholder.com/350x150' },
        { id: 6, title: 'Plumber', startDate: '24/03/23', endDate: '24/03/23', image: 'https://via.placeholder.com/350x150' },
    ];


    const getDaysInMonth = (month, year) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const renderDateItem = ({ item }) => {
        const isSelected = item.toDateString() === selectedDate.toDateString();
        return (
            <TouchableOpacity
                style={[styles.dateItem, isSelected && styles.selectedDateItem]}
                onPress={() => setSelectedDate(item)}
            >
                <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{item.getDate()}</Text>
            </TouchableOpacity>
        );
    };

    const daysInMonth = getDaysInMonth(selectedDate.getMonth(), selectedDate.getFullYear());

    const renderTaskItem = ({ item }) => (
        <View style={styles.card}>
            <LinearGradient
                colors={['#fff', '#e0f7fa']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardGradient}
            >
                <View style={styles.cardLeft}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDate}>Start Date: {item.startDate}</Text>
                    <Text style={styles.cardDate}>End Date: {item.endDate}</Text>
                </View>
                <TouchableOpacity style={styles.cardRight} onPress={() => { }}>
                    <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.cardImage} />
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('./assets/chowkpe.png')} style={styles.logo} />
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => { }}>
                        <Image source={require('./assets/Group298.png')} style={styles.notificationIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Image source={require('./assets/Ellipse.png')} style={styles.profileIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cont}>
                <Swiper
                    style={styles.carousel}
                    showsButtons={false}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}
                >
                    {carouselData.map((item) => (
                        <View style={styles.slide} key={item.id}>
                            <Image source={{ uri: item.image }} style={styles.carouselImage} />

                        </View>
                    ))}
                </Swiper>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.calendarContainer}>
                    <Text style={styles.dateLabel}>Date</Text>
                    <FlatList
                        data={daysInMonth}
                        renderItem={renderDateItem}
                        keyExtractor={(item) => item.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.dateStyle}
                    />
                </View>
                <FlatList
                    data={taskData}
                    renderItem={renderTaskItem}
                    keyExtractor={item => item.id.toString()}
                    style={styles.taskList}
                    contentContainerStyle={styles.scrollContainer}
                />
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={handleCreateTask}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginTop: '6%',
    },
    logo: {
        height: 40,
        resizeMode: 'contain',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationIcon: {
        width: 25,
        height: 25,
        marginRight: 15,
    },
    profileIcon: {
        width: 35,
        height: 35,
        marginRight: 15,
    },
    carousel: {
        height: '100%',
    },
    cont: {
        height: '28%',
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },

    content: {
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    calendarContainer: {
        marginBottom: 10,
    },
    dateLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dateItem: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: 5,
    },
    selectedDateItem: {
        backgroundColor: '#3B82F6',
    },
    dateText: {
        fontSize: 16,
    },
    selectedDateText: {
        color: 'white',
    },
    taskList: {
        flex: 1,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,
        marginVertical: 10,
    },
    cardGradient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    cardLeft: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDate: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    cardRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    cardImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#3B82F6',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    fabText: {
        color: 'white',
        fontSize: 24,
    },
});

export default TaskListScreen;
