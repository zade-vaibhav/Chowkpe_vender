import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

const CreateTask = ({ navigation }) => {
  const [skills, setSkills] = useState([
    {
      id: 1,
      title: "Deep Cleaning",
      date: "2024-07-12",
      image: require("../../assets/images/task/Task 1.png"),
      isVideo: false,
    },
    {
      id: 2,
      title: "Warehouse",
      date: "2024-07-13",
      image: require("../../assets/images/task/Frame.png"),
      isVideo: true,
    },
    {
      id: 3,
      title: "Event Job",
      date: "2024-07-14",
      image: require("../../assets/images/task/Task 3.png"),
      isVideo: false,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Create new task</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {skills.map((skill) => (
          <View key={skill.id} style={styles.card}>
            <LinearGradient
              colors={['#fff', '#e0f7fa']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }} 
              style={styles.cardGradient}
            >
              <View style={styles.cardLeft}>
                <Text style={styles.cardTitle}>{skill.title}</Text>
                <Text style={styles.cardDate}>{skill.date}</Text>
                <TouchableOpacity style={styles.rebookButton}>
                  <Text style={styles.rebookButtonText}>Rebook</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.cardRight}
                onPress={() => {
                  
                }}
              >
                <Image source={skill.image} style={styles.cardImage} />
                {skill.isVideo && (
                  <View style={styles.playIconContainer}>
                    <Icon name="play-circle" size={40} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <View style={styles.circleIcon}>
          <Icon name="add" size={20} color="white" />
        </View>
        <Text style={styles.buttonText}>Create New Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    position: "absolute",
    left: 10,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    padding: 10,
    color: "black",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    borderRadius: 8,
    marginVertical: 10,
    overflow: 'hidden', 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardGradient: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  cardLeft: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  cardRight: {
    width: width * 0.3,
    height: height * 0.15,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "black",
  },
  cardDate: {
    fontSize: 14,
    color: "gray",
    marginBottom: 8,
  },
  rebookButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    minWidth: 80,
    maxWidth: 120,
    flexShrink: 1,
  },
  rebookButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 8,
  },
  playIconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    marginBottom: 32,
    minWidth: 200,
  },
  circleIcon: {
    backgroundColor: "#007BFF",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default CreateTask;