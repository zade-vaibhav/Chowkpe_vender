import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Alert, TouchableOpacity } from 'react-native';
import Group from '../../assets/images/skill/Vertical-Full.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const JobDetailsScreen = ({ navigation, route }) => {
    const { data } = route.params;
    const [myId, setMyId] = useState("");
 
    useEffect(() => {
        navigation.setOptions({
            headerTitle: ' ',
            headerShown: false,
        });
    }, [navigation]);

    const defaultCarouselData = [
        {
          image:
            "https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?cs=srgb&dl=pexels-sevenstormphotography-439416.jpg&fm=jpg",
          id: 1,
        },
        {
          image:
            "https://www.jkcement.com/wp-content/uploads/2023/09/plasterer-hand-rubber-glove-using-wooden-trowel-plastering-cement-brick-wall-background-1-scaled.jpg",
          id: 2,
        },
        {
          image:
            "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
          id: 3,
        },
        {
          image:
            "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
          id: 4,
        },
      ];

      async function handelNavigate(data){
         await AsyncStorage.setItem("taskId",data._id)
         navigation.navigate('WorkerListScreen')
      }
      
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerContainer}>
                    <View style={styles.cont}>
       
        <Swiper
          style={styles.carousel}
          showsButtons={false}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          autoplay
          autoplayTimeout={5}
          showsPagination={false}
        >
          { data.task.jobPhotos[0].split(",").map((item,id) => (
            
              <View style={styles.slide} key={id}>
                <Image
                  source={{ uri:item }}
                  style={styles.carouselImage}
                />
              </View>
            )
          )}
        </Swiper>
      </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title}>Job Detail</Text>
                        <Text style={styles.valuedetail}>{data.task.title}</Text>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Vendor Id</Text>
                                <Text style={styles.value}>{data.task.vendorId.slice(0,5)}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Work Starting Period</Text>
                                <Text style={styles.value}>{data.task.workStartingPeriod}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Earning/Hr</Text>
                                <Text style={styles.value}>{data.task.salaryRange}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Category</Text>
                                <Text style={styles.value}>{data.task.hireCategory}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Address</Text>
                                <Text style={styles.value}>{data.task.addressLocation}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Documentation Required</Text>
                                <Text style={styles.value}>{data.task.documentsRequired.join(', ')}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Job Description</Text>
                                <Text style={styles.value}>{data.task.jobDescription}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>What additional things we provide?</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Accommodation?</Text>
                                <Text style={styles.value}>{data.task.accommodation ? "Yes" : "No"}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>Food?</Text>
                                <Text style={styles.value}>{data.task.food ? "Yes" : "No"}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>ESI?</Text>
                                <Text style={styles.value}>{data.task.esi ? "Yes" : "No"}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.label}>PF?</Text>
                                <Text style={styles.value}>{data.task.pf ? "Yes" : "No"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => handelNavigate(data)}
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
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
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
        backgroundColor: 'transparent',
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
        width: '90%',
        borderRadius: 10,
    },
    footerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    carousel: {
      height: "100%",
    },
    cont: {
      height: "78%",
    },
    slide: {
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    carouselImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
      borderRadius: 8,
    },
});

export default JobDetailsScreen;
