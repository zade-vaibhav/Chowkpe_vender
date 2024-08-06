import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Text, Image, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profile from "../../../assets/images/skill/Vertical-Full.png"

const Workerjoined = ({ navigation }) => {
    const [isChange, setIsChange] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [task, setTask] = useState(null);
    const [refresh,setRefresh] = useState(false)

    const handlePress = (profileData) => {
        navigation.navigate('WorkerProfile', { profileData,show:false });
    };

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
            if (data.success === true) {
                setTask(data.task);
            } else {
                Alert.alert("No worker joined");
            }
        } catch (err) {
            Alert.alert("Error fetching data");
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getTask();
            setIsChange(!isChange); // Trigger a state change to re-render the component
        }, [navigation])
    );

    useEffect(()=>{
        getTask();
    },[refresh])

    async function joinworker( userId) {
        const taskId = await AsyncStorage.getItem("taskId");
        try {
            const response = await fetch("https://chowkpe-server.onrender.com/api/v1/admin/task/joinWorker", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', // Specify the content type
                  'Authorization': 'Bearer YOUR_TOKEN_HERE' // If you need authorization
                },
                body: JSON.stringify({
                    taskId, userId
                })
              });
              const data =await response.json();
              if(data.success == true){
                Alert.alert(data.message)
                setRefresh(!refresh)
              }else{
                Alert.alert(data.message)
              }
        } catch (err) {
            Alert.alert(err.message)
        }
    }
   function isWorkerSelected(task, workerId) {
    return task.workersSelected.some(worker => worker._id === workerId);
  }

  function isWorkerApproved(task, workerId) {
    return task.workerApproved.some(worker => worker._id === workerId);
}

  function isWorkerNotSelected(task, workerId) {
    return !task.workersSelected.some(worker => worker._id === workerId);
  }

    return (
        <View style={{flex:1}}>
            <Text style={{textAlign:"center",marginTop:10}}>"here you will find all the worker joined with there status"</Text>
<ScrollView contentContainerStyle={styles.container}>
            {isLoading ? (
                <View style={styles.centeredContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : task ? (
                task.workersJoined.length === 0 ? (
                    <View style={styles.centeredContainer}>
                        <Text style={{fontWeight:"700",color:"gray",fontSize:16,fontStyle:"italic"}}>No worker joined</Text>
                    </View>
                ) : (
                    task.workersJoined.map((worker, index) => (
                        <TouchableOpacity key={index} style={styles.card} onPress={()=>handlePress(worker)}>
                            <View style={styles.content}>
                                <View style={styles.details}>
                                    <Text style={styles.label}>Name : <Text style={styles.value}>{worker.profile.name}</Text></Text>

                                    <Text style={styles.label}>Skills : <Text style={styles.value}>{worker.profile.skills.map((ele)=>{return ele+", "})}</Text></Text>

                                    <Text style={styles.label}>Experience :  <Text style={styles.value}>1 year</Text></Text>

                                </View>

                                <Image source={profile} style={styles.image} />
                            </View>
                            {
                                isWorkerApproved(task, worker._id) ? <TouchableOpacity style={styles.approvedbutton}>
                                <Text style={styles.buttonText}>Approved</Text>
                            </TouchableOpacity>:
                                isWorkerSelected(task,worker._id)?<TouchableOpacity style={styles.selectedbutton}>
                                <Text style={styles.buttonText}>In-Review</Text>
                            </TouchableOpacity>:<TouchableOpacity style={styles.button} onPress={()=>joinworker(worker._id)}>
                                <Text style={styles.buttonText}>Get In</Text>
                            </TouchableOpacity>
                            }

                            {/* {
                                isWorkerNotSelected(task,worker._id)&&<TouchableOpacity style={styles.removebutton}>
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                            } */}
                            
                        </TouchableOpacity>
                    ))
                )
            ) : (
                <Text>somthing went wrong</Text>
            )}
        </ScrollView>
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
    approvedbutton:{
        backgroundColor: "green",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '95%'
    }
    ,selectedbutton:{
        backgroundColor: "#ff9900",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '95%'
    },removebutton:{
        backgroundColor: "red",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '95%'
    },
    button: {
        backgroundColor: '#0033A0',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '95%',
        marginBottom:5

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

export default Workerjoined