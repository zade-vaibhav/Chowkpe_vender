import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Alert, TouchableOpacity } from 'react-native';
import Group from '../../assets/Vertical-Full.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const JobDetailsScreen = ({ navigation, route }) => {
    const { data } = route.params;
    const [myId, setMyId] = useState("");

    useEffect(() => {
        navigation.setOptions({
            headerTitle: ' ',
            headerShown: false,
        });
        gettingToken();
    }, [navigation]);

    async function gettingToken() {
        const token = await AsyncStorage.getItem("uid");
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            // const response = await fetch('https://chowkpe-server.onrender.com/api/v1/auth/token', requestOptions);

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const data = await response.json();

            if (data.success === true) {
                setMyId(data.workerId);
            } else {
                Alert.alert(data.message);
            }
        } catch (error) {
            // console.error('There was a problem with the fetch operation:', error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerContainer}>
                        <Image source={typeof data.image === 'string' ? { uri: data.image } : data.image} style={styles.headerImage} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title}>Job Detail</Text>
                        <Text style={styles.valuedetail}>{data.title}</Text>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Vendor Id</Text>
                                <Text style={styles.value}>{data.id}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Work Starting Period</Text>
                                <Text style={styles.value}>{data.workStartingPeriod}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Earning/Hr</Text>
                                <Text style={styles.value}>{data.earningPerHour}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Category</Text>
                                <Text style={styles.value}>{data.category.join(', ')}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Address</Text>
                                <Text style={styles.value}>{data.address}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Documentation Required</Text>
                                <Text style={styles.value}>{data.documentationRequired.join(', ')}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Job Description</Text>
                                <Text style={styles.value}>{data.jobDescription}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>What additional things we provide?</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Accommodation?</Text>
                                <Text style={styles.value}>{data.accommodation ? "Yes" : "No"}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Food?</Text>
                                <Text style={styles.value}>{data.food ? "Yes" : "No"}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>ESI?</Text>
                                <Text style={styles.value}>{data.esi ? "Yes" : "No"}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>PF?</Text>
                                <Text style={styles.value}>{data.pf ? "Yes" : "No"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => navigation.navigate('WorkersListScreen')}
                >
                    <Text style={styles.footerButtonText}>Show Workers</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',  // Ensure footer button is at the bottom
    },
    scrollContainer: {
        backgroundColor: "#F5F5F5",
        alignItems: 'center',
        paddingVertical: 10,
    },
    innerContainer: {
        alignItems: 'center',
        width: '100%',
    },
    headerContainer: {
        width: width * 0.8,
        height: height * 0.4,
        aspectRatio: 16 / 9,
        backgroundColor: '#EFEFF9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImage: {
        marginTop: 65,
        width: '80%',
        height: '70%',
        resizeMode: 'contain',
    },
    detailsContainer: {
        backgroundColor: '#FFFFFF',
        width: '90%',
        borderRadius: 10,
        padding: 20,
        marginTop: -19,
        elevation: 7,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 40,
        textAlign: 'center',
        color: "black",
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    detailColumn: {
        width: '45%',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: "black",
        marginBottom: 5,
    },
    value: {
        fontSize: 14,
        marginBottom: 2,
        color: "gray",
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    valuedetail: {
        fontSize: 14,
        marginBottom: '2%',
        textAlign: 'center',
        color: "gray",
        position: 'relative',
        top: '-6%',
    },
    footerButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        borderRadius: 10,
    },
    footerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    }
});

export default JobDetailsScreen;
