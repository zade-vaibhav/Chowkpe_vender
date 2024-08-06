import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Welcome = ({navigation}) => {
  const [isLoading,setIsloading] =useState(false)

  const handleGetStarted = ()=>{
    navigation.navigate('Login')
  }

  useEffect(() => {
    const checkTokens = async () => {
       setIsloading(true)
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      console.log(accessToken,"  ",refreshToken)
      if (!accessToken && !refreshToken) {
        setIsloading(false)
        navigation.navigate('Login')
        return;
      }

      const response = await fetch('https://chowkpe-server.onrender.com/api/v1/vender/verifyVender', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, refreshToken }),
      });

      const data = await response.json();

      if(data?.message == "Invalid user"){
        setIsloading(false)
        navigation.replace('Login')
        return;
      }
      if (data.success) {
        setIsloading(false)
        console.log(data)
        await AsyncStorage.setItem('accessToken', data.accessToken);
        if (data?.vender?.venderProfile === undefined) {
          navigation.replace("Company Details");
        } else {
          navigation.replace("BottomNavigator");
        }
      } else {
    
        setIsloading(false)
        Alert.alert('Session Expired', 'Please login again.');
        navigation.replace("Login");
      }
    };

    checkTokens();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.innerContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Best helping</Text>
        <Text style={styles.subheading}>hand for you</Text>
      </View>
      <Image 
        source={require("../../assets/plumber.png")} 
        style={styles.image} 
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          {
            isLoading?<ActivityIndicator
            size="small"
            color="#fff"
          />:<Text style={styles.buttonText}>Get Started</Text>
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: RFPercentage(4), 
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  subheading: {
    fontSize: RFPercentage(4), 
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: width * 0.9, 
    height: height * 0.7, 
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: RFPercentage(2.5), // Responsive font size
    textAlign: 'center',
  },
});

export default Welcome;
