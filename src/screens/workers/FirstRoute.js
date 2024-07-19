import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card'; // adjust the import path accordingly
import { useNavigation } from '@react-navigation/native';

const profiles = [
    {
        name: "Nikita",
        skills: " Forklift Operator",
        rating: '4',
        experience: '03',
        image: require('../../../assets/cleaner.png'),
    },
    {
        name: "Alex",
        skills: "Electrician, Technician",
        rating: '5',
        experience: '06',
        // image: require('../../../assets/electrician.png')
    },
    {
        name: "Jordan",
        skills: "Plumber, Installer",
        rating: '3',
        experience: '02',
        // image: require('../../../assets/plumber.png')
    },
    {
        name: "Taylor",
        skills: "Chef, Caterer",
        rating: '4',
        experience: '04',
        // image: require('../../../assets/chef.png')
    }
];

const FirstRoute = () => {
    const navigation = useNavigation();

    const handlePress = (profileData) => {
        navigation.navigate('WorkerProfileScreen', { profileData });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {profiles.map((profile, index) => (
                <TouchableOpacity key={index} onPress={() => handlePress(profile)}>
                    <Card
                        name={profile.name}
                        skills={profile.skills}
                        rating={profile.rating}
                        experience={profile.experience}
                        image={profile.image}
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 6,
        backgroundColor: '#f0f0f0',
    },
});

export default FirstRoute;
