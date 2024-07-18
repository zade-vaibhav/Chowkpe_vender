import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";

const WorkerProfileScreen = () => {
    const navigation = useNavigation();

    const handlePayment = () => {
        // Navigate to WorkerProfileScreen when "Create Task" is pressed
        // navigation.navigate('Details Screen');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
            {/* <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity> */}
                <Text style={styles.headerTitle}>Worker Profile</Text>
            </View>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3flIHsvZtK3eU7tEnp-LSEjNznTZCn0dkcA&s' }}
                    style={styles.profileImage}
                />
                <View style={styles.profileDetails}>
                    <Text style={styles.profileName}>Ashutosh Pandey</Text>
                    <Text style={styles.profileTitle}>Cleaning Expert</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>4.5</Text>
                        <Text style={styles.ratingStars}>★★★★★</Text>
                        <FontAwesome name="whatsapp" size={24} color="#25D366" style={styles.icon} />
                        <FontAwesome name="phone" size={24} color="#3B82F6" style={styles.icon} />
                    </View>
                </View>
            </View>

            {/* Info Section */}
            <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>259+</Text>
                    <Text style={styles.infoLabel}>Service Delivered</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>05+</Text>
                    <Text style={styles.infoLabel}>Years of Experience</Text>
                </View>
            </View>

            {/* Skills Section */}
            <View style={styles.skillsContainer}>
                <Text style={styles.skillsTitle}>Skill Experience</Text>
                <View style={styles.skillsBox}>
                    <View style={styles.skillItem}>
                        <Image source={require('../../assets/cleaner.png')}
                            style={styles.skillImage}
                        />
                        <Text style={styles.skillText}>Cleaner</Text>
                    </View>
                    <View style={styles.skillItem}>
                        <Image source={require('../../assets/Forklifter.png')}
                            style={styles.skillImage}
                        />
                        <Text style={styles.skillText}>Forklift Operator</Text>
                    </View>
                </View>
            </View>

            {/* Payment Section (Footer) */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.paymentContainer}
                    onPress={handlePayment}
                >
                    <Text style={styles.paymentText}>Payment ₹170</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: '10%',
    },
    // backButton: {
    //     width: 40,
    //     height: 40,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     backgroundColor: "#fff",
    //     borderRadius: 5,
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 2,
    //     elevation: 4,
    //     position: "absolute",
    //     left: 10,
    //   },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: '7%',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    profileDetails: {
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileTitle: {
        fontSize: 16,
        color: '#888',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    ratingText: {
        fontSize: 18,
        marginRight: 5,
    },
    ratingStars: {
        fontSize: 18,
        color: '#FFD700',
    },
    icon: {
        marginLeft: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: '8%',
        borderWidth: 0.3,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    infoBox: {
        alignItems: 'center',
        flex: 1,
    },
    line: {
        width: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 10,
    },
    infoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3B82F6',
    },
    infoLabel: {
        fontSize: 14,
        color: '#888',
    },
    skillsContainer: {
        marginBottom: 20,
        marginTop: '6%',
    },
    skillsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    skillsBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '5%',
    },
    skillItem: {
        alignItems: 'center',
        width: '45%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 2,
        borderRadius: 20,
    },
    skillImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    skillText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 'auto',
    },
    paymentContainer: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#3B82F6',
        borderRadius: 5,
    },
    paymentText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default WorkerProfileScreen;
