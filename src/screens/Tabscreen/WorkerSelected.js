import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert, Image } from 'react-native';
import Card from '../Card'; // adjust the import path accordingly
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profile from "../../../assets/images/skill/Vertical-Full.png"

const WorkerSelected = ({ navigation }) => {
  const [isChange, setIsChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState(null);
  const [vender, setVender] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [categoryPrices, setCategoryPrices] = useState(null)
  const [isLoad, setIsLoad] = useState(false);

  const handlePress = (profileData) => {
    navigation.navigate('WorkerProfile', { profileData, show: true });
  };

  // get vender
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
      console.log(data)
      if (data.success === true) {
        setIsLoad(false)
        setVender(data.vender)
        setCategoryPrices({
          "Forklift Operator": data.vender.venderProfile.categoryPrices.Forklift_Operator,
          "Assemble Line Worker": data.vender.venderProfile.categoryPrices.Assemble_Line_Worker,
          "Cleaner": data.vender.venderProfile.categoryPrices.Cleaning,
          "Picker": data.vender.venderProfile.categoryPrices.Picker,
          "Sorter": data.vender.venderProfile.categoryPrices.Sorter,
          "Plumber": data.vender.venderProfile.categoryPrices.Plumber,
          "Shipping": data.vender.venderProfile.categoryPrices.Shipping,
          "Other": data.vender.venderProfile.categoryPrices.Other,
        });
      } else {
        setIsLoad(false)
        Alert.alert(data.message);
      }
    } catch (err) {
      setIsLoad(false)
      Alert.alert("Error fetching data", err.message);
    }
  };


  // get Task
  const getTask = async () => {
    setIsLoading(true);
    const taskId = await AsyncStorage.getItem("taskId");
    if (!taskId) {
      Alert.alert("Something went wrong!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`https://chowkpe-server.onrender.com/api/v1/vender/task/${taskId}`);
      const data = await response.json();
      console.log(data)
      if (data.success === true) {
        setTask(data.task);
      } else {
        Alert.alert("No worker joined");
      }
    } catch (err) {
      Alert.alert("Error fetching data", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTask();
      getVender()
      setIsChange(!isChange); // Trigger a state change to re-render the component
    }, [navigation])
  );

  useEffect(() => {
    getTask();
    getVender()
  }, [refresh])

  async function removeApproval(userId) {
    const taskId = await AsyncStorage.getItem("taskId");
    try {
      const response = await fetch("https://chowkpe-server.onrender.com/api/v1/vender/task/worker/removeApproval", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
          'Authorization': 'Bearer YOUR_TOKEN_HERE' // If you need authorization
        },
        body: JSON.stringify({
          taskId, userId
        })
      });
      const data = await response.json();

      if (data.success == true) {
        Alert.alert(data.message)
        setRefresh(!refresh)
      } else {
        Alert.alert(data.message)
      }
    } catch (err) {
      Alert.alert(err.message)
    }
  }


  // get category Price
  const getCategoryPrice = (category) => {
    console.log(category)
    console.log(vender?.venderProfile?.customCategories)
    // Normalize the category string for comparison
    const normalizedCategory = category.trim().toLowerCase();

    if (categoryPrices?.hasOwnProperty(normalizedCategory)) {
      return categoryPrices[normalizedCategory];
    } else {
      // Iterate through the customCategories array
      for (let i = 0; i < vender?.venderProfile?.customCategories.length; i++) {
        const customCategoryName = vender?.venderProfile?.customCategories[i].name.trim().toLowerCase();
        if (customCategoryName === normalizedCategory) {
          console.log(vender?.venderProfile?.customCategories, "  ", category);
          return vender?.venderProfile?.customCategories[i].price;
        }
      }
      // Return the default price if category not found
      return 500;
    }
  };

  async function contactCompany() {
    const token = await AsyncStorage.getItem("uid");
    const taskId = await AsyncStorage.getItem("taskId");
    if (!token) {
      setIsLoad(false)
      Alert.alert("no token found plese login again!!");

      return;
    }
    try {
      const response = await fetch(`https://chowkpe-server.onrender.com/api/v1/vender/contactCompany`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          taskId
        })
      });
      const data = await response.json();
      console.log(data)
      if (data.success == true) {
        setRefresh(!refresh)
        Alert.alert(data.message)
      } else {
        Alert.alert(data.message)
      }
    } catch (err) {
      Alert.alert(err.message)
    }
  }

  const handleContactCompany = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to contact the company?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: contactCompany },
      ]
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: "center", marginTop: 10 }}>"Your approved worker"</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {isLoading ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : task ? (
          task.workerApproved.length === 0 ? (
            <View style={styles.centeredContainer}>
              <Text style={{ fontWeight: "700", color: "gray", fontSize: 16, fontStyle: "italic" }}>No worker Approved</Text>
            </View>
          ) : (
            task.workerApproved.map((worker, index) => (

              <TouchableOpacity key={index} style={styles.card} onPress={() => handlePress(worker)}>
                <View style={styles.content}>
                  <View style={styles.details}>
                    <Text style={styles.label}>Name : <Text style={styles.value}>{worker.profile.name}</Text></Text>

                    <Text style={styles.label}>Skills : <Text style={styles.value}>{worker.profile.skills.map((ele) => { return ele + ", " })}</Text></Text>

                    <Text style={styles.label}>Experience :  <Text style={styles.value}>1 year</Text></Text>

                  </View>

                  <Image source={profile} style={styles.image} />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => removeApproval(worker._id)}>
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </TouchableOpacity>

            ))
          )
        ) : (
          <Text>somthing went wrong</Text>
        )}
      </ScrollView>
      {
        task ?<View style={styles.stickyBox}>
        <View style={styles.costContainer}>
          <Text style={styles.label}>Cost/Worker :</Text>
          {
            isLoad ? <ActivityIndicator size="small" color="#0000ff" /> : vender && <Text style={styles.value}>{getCategoryPrice(task?.task?.hireCategory[0])} Rs</Text>
          }

        </View>
        <View style={styles.costContainer}>
          <Text style={styles.label}>Number of Workers :</Text>
          <Text style={styles.value}>{task?.workerApproved.length}</Text>
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.label}>Additional Charges :</Text>
          <Text style={styles.value}>0 Rs</Text>
        </View>
        <View style={{ width: "100%", borderWidth: 1, backgroundColor: "black", marginBottom: 5 }}></View>
        <View style={styles.costContainer}>
          <Text style={styles.label}>Total Cost:</Text>
          {isLoad ? <ActivityIndicator size="small" color="#0000ff" /> : vender && <Text style={{ fontSize: 16, color: 'black', fontWeight: "700" }}>{(getCategoryPrice(task?.task?.hireCategory[0])) * (task?.workerApproved.length)} Rs</Text>}
        </View>
        {
          task?.contactCompany == true ? (<TouchableOpacity style={styles.connectedButton} >
            <Text style={styles.contactButtonText}>Connected</Text>
          </TouchableOpacity>) : (<TouchableOpacity style={styles.contactButton} onPress={() => handleContactCompany()}>
            <Text style={styles.contactButtonText}>Contact Company</Text>
          </TouchableOpacity>)
        }

      </View>:<></>
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: '#f0f0f0',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, card: {
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
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%'
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
  stickyBox: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  costContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#888',
  }, connectedButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  contactButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default WorkerSelected