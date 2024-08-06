import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import profile from "../../assets/images/skill/Vertical-Full.png"

const Card = ({ name, skills, rating, experience, image }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('WorkerProfile', { name, skills, rating, experience});
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <View style={styles.content}>
                <View style={styles.details}>
                    <Text style={styles.label}>Name : <Text style={styles.value}>{name}</Text></Text>
                    
                    <Text style={styles.label}>Skills : <Text style={styles.value}>{skills}</Text></Text>
                    
                    <Text style={styles.label}>Experience :  <Text style={styles.value}>{experience}</Text></Text>
                   
                </View>

                <Image source={profile} style={styles.image} />
            </View>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Get In</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
        marginVertical: 8,
    },
    button: {
        backgroundColor: '#0033A0',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    content: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    details: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
       
    },

    value: {
        fontSize: 16,
        color: '#888',
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: 16,
    },
});

export default Card;
