import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CompanyDetailsScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [alternativePhoneNumber, setAlternativePhoneNumber] = useState('');
    const [alternativeEmail, setAlternativeEmail] = useState('');
    const navigation = useNavigation();

    // gst/pan no. , company address

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(number);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleContinue = () => {
        if (!validatePhoneNumber(phoneNumber)) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Invalid Email Address', 'Please enter a valid email address.');
            return;
        }
        // Additional validation can be added here if needed

        Alert.alert('Success', 'Form submitted successfully!');
        navigation.navigate('TaskList');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Company Details Screen</Text>
            </View>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Business Type</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Select business type"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Business Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter business name"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Authorize Person Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter name"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contact Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter contact number"
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Alternative Contact Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter alternative contact number"
                                keyboardType="phone-pad"
                                value={alternativePhoneNumber}
                                onChangeText={setAlternativePhoneNumber}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter email address"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Alternative Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter alternative email address"
                                keyboardType="email-address"
                                value={alternativeEmail}
                                onChangeText={setAlternativeEmail}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Company Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter company address"


                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.skipText}>Skip for now</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
        marginTop: '5%',
    },
    headerText: {
        fontSize: Dimensions.get('window').width * 0.05,
        fontWeight: 'bold',
    },
    scrollContainer: {
        padding: Dimensions.get('window').width * 0.05,
        backgroundColor: 'white',
        paddingBottom: 100, // to ensure scrolling doesn't overlap footer
    },
    form: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: Dimensions.get('window').height * 0.015,
    },
    label: {
        marginBottom: 5,
        fontSize: Dimensions.get('window').width * 0.035,
        fontWeight: '600',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        fontSize: Dimensions.get('window').width * 0.04,
    },
    footer: {
        padding: Dimensions.get('window').width * 0.05,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#3B82F6',
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: Dimensions.get('window').width * 0.04,
        fontWeight: 'bold',
    },
    skipText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 10,
        fontSize: Dimensions.get('window').width * 0.035,
    },
});

export default CompanyDetailsScreen;
