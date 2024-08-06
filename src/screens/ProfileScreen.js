import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [isHindi, setIsHindi] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [vender, setVender] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false)
  const [isDeleting,setISDeleting] = useState(false)

  const getVender = async () => {
    setIsLoad(true)
    const token = await AsyncStorage.getItem("uid");
    if (!token) {
      setIsLoad(false)
      Alert.alert("no token found plese login again!!");

      return;
    }
    try {
      const response = await fetch(`https://chowkpe-server.onrender.com/api/v1/vender/business`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await response.json();
      if (data.success === true) {
        setIsLoad(false)
        setVender(data.vender)
      } else {
        setIsLoad(false)
        Alert.alert(data.message);
      }
    } catch (err) {
      setIsLoad(false)
      Alert.alert("Error fetching data", err.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchDataAsync = async () => {
        getVender()
      };

      fetchDataAsync();
    }, [isRefresh])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsRefresh(!isRefresh);
    });
    return unsubscribe;
  }, [navigation]);


  const handleDeleteAccount = () => {
    Alert.alert(
      'Are you sure?',
      'Do you really want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setISDeleting(true)
            const token = await AsyncStorage.getItem("uid")
            try {
              const responce = await fetch("https://chowkpe-server.onrender.com/api/v1/vender/deleteVender", {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
              })

              const data =await responce.json();
              if(data.success === true){
                  await AsyncStorage.removeItem("uid");
                  await AsyncStorage.removeItem("taskId");
                  setISDeleting(false)
                  Alert.alert(data.message);
                  navigation.replace("Login")
              }else{
                setISDeleting(false)
                Alert.alert(data.message);
              }

            } catch (err) {
              setISDeleting(false)
              console.log(err.message)
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={{ flex: 1 }}>
      {
        isLoad && <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      }
      {vender && <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.item}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{vender?.venderProfile?.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{vender?.venderProfile?.email}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{vender?.venderProfile?.contactNumber}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <View style={styles.switchContainer}>
            <Text>English</Text>
            <Switch
              value={isHindi}
              onValueChange={setIsHindi}
            />
            <Text>Hindi</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Details</Text>
          <View style={styles.item}>
            <Text style={styles.label}>Business Name:</Text>
            <Text style={styles.value}>{vender?.venderProfile?.businessName}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>PAN/GST Number:</Text>
            <Text style={styles.value}>{vender?.venderProfile?.gstOrPanNumber}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{vender?.venderProfile?.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Prices</Text>
          <View style={styles.categoryContainer}>
            {Object.entries(vender?.venderProfile?.categoryPrices).map(([category, price], index) => (
              <View style={styles.categoryItem} key={index}>
                <Text style={styles.categoryLabel}>{category.replace(/_/g, ' ')} :  </Text>
                <Text style={styles.categoryValue}>{price} Rs</Text>
              </View>
            ))}
          </View>
        </View>

        {
          isDeleting?<TouchableOpacity style={styles.deleteButton} >
         <ActivityIndicator size="small" color="#fff" />
        </TouchableOpacity>:<TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
        }
        
      </ScrollView>
      }

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '100%',
    marginBottom: 10,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryValue: {
    fontSize: 16,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
