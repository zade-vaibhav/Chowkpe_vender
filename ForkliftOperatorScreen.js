import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';

const ForkliftOperatorScreen = () => {
    const [workType, setWorkType] = useState('Full Time');
    const [selectedDate, setSelectedDate] = useState(null);
    const dates = ['Immediately', 'After 15 days', 'After 1 month'];

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Select Starting Date');

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setSelectedDate(item); // Optional: If you want to set state of selectedDate
        setDropdownVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Image source={require('./assets/vector.png')} style={styles.backButtonImage} />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image source={require('./assets/forklift.png')} style={styles.operatorImage} />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Forklift Operator</Text>
                <Text style={styles.center}>Today</Text>
            </View>
            <View style={styles.messageBox}>
                <Image source={require('./assets/chowkpe.png')} style={styles.logoImage} />
                <Text style={styles.message}>👋 Hi there! Welcome to Chowkpe!</Text>
                <Text style={styles.dateText}>25 Jan 24</Text>
            </View>
            <ScrollView>
                <View style={styles.section}>
                    <Image source={require('./assets/chowkpe.png')} style={styles.logoImage} />
                    <Text style={styles.sectionText}>Select Work Type</Text>
                    <Text style={styles.dateText}>25 Jan 24</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, workType === 'Full Time' && styles.selectedButton]}
                            onPress={() => setWorkType('Full Time')}
                        >
                            <Text style={[styles.buttonText, workType === 'Full Time' && styles.selectedButtonText]}>Full Time</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, workType === 'On Demand' && styles.selectedButton]}
                            onPress={() => setWorkType('On Demand')}
                        >
                            <Text style={[styles.buttonText, workType === 'On Demand' && styles.selectedButtonText]}>On Demand</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.section}>
                    <Image source={require('./assets/chowkpe.png')} style={styles.logoImage} />
                    <Text style={styles.sectionText}>Select Starting Date</Text>
                    <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                        <Text style={styles.dropdownButtonText}>{selectedItem}</Text>
                    </TouchableOpacity>
                    {dropdownVisible && (
                        <View style={styles.dropdown}>
                            {dates.map((date, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.dropdownItem, selectedDate === date && styles.selectedDropdownItem]}
                                    onPress={() => handleSelectItem(date)}
                                >
                                    <Text style={[styles.dropdownItemText, selectedDate === date && styles.selectedDropdownItemText]}>{date}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    logoImage: {
        width: '14%',
        height: 19,
        marginBottom: 10,
    },
    backButtonImage: {
        marginLeft: -14,
        width: 84,
        height: 84,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    operatorImage: {
        width: '80%',
        height: 150,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    messageBox: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
        marginBottom: 5,
    },
    center: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: '45%',
    },
    dateText: {
        fontSize: 14,
        color: '#007bff',
        textAlign: 'right',
    },
    section: {
        marginBottom: 20,
    },
    sectionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 15,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selectedButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    selectedButtonText: {
        color: '#fff',
    },
    dropdownButton: {
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    dropdownButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    dropdown: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        elevation: 5,
    },
    dropdownItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dropdownItemText: {
        fontSize: 16,
    },
    selectedDropdownItem: {
        backgroundColor: '#007bff',
    },
    selectedDropdownItemText: {
        color: '#fff',
    },
});

export default ForkliftOperatorScreen;
