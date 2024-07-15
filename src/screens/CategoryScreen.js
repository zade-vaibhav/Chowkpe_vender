import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import CheckBox from "react-native-check-box";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const CategoryScreen = ({ navigation }) => {
  const [skills, setSkills] = useState([
    {
      id: 1,
      image: require("../../assets/images/skill/EstatesCard.png"),
      name: "Shipping",
      checked: false,
    },
    {
      id: 2,
      image: require("../../assets/images/skill/Vertical-Full.png"),
      name: "Cleaner",
      checked: false,
    },
    {
      id: 3,
      image: require("../../assets/images/skill/Vertical-Full1.png"),
      name: "Picker",
      checked: false,
    },
    {
      id: 4,
      image: require("../../assets/images/skill/Vertical-Full3.png"),
      name: "Forklift Operator",
      checked: false,
    },
    {
      id: 5,
      image: require("../../assets/images/skill/Sorter.png"),
      name: "Sorter",
      checked: false,
    },
    {
      id: 6,
      image: require("../../assets/images/skill/AssembleWorkerLine.png"),
      name: "Assemble Line Worker",
      checked: false,
    },
    {
      id: 7,
      image: require("../../assets/images/skill/Group 1.png"),
      name: "Picker",
      checked: false,
    },
    {
      id: 8,
      image: require("../../assets/images/skill/Group.png"),
      name: "Forklift Operator",
      checked: false,
    },
  ]);

  const [isContinueDisabled, setIsContinueDisabled] = useState(true);

  useEffect(() => {
    const anyChecked = skills.some((skill) => skill.checked);
    setIsContinueDisabled(!anyChecked);
  }, [skills]);

  const handleCheckBoxClick = (id) => {
    const updatedSkills = skills.map((skill) =>
      skill.id === id ? { ...skill, checked: !skill.checked } : skill
    );
    setSkills(updatedSkills);
  };

//   const handleContinuePress = () => {
//     if (!isContinueDisabled) {
//       navigation.navigate("CreatProileScreen", { skills, referralId });
//     }
//   };
  // console.log(skills);



  return (
    <View style={styles.container}>
          <View style={styles.headingContainer}>
          <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Select Category</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {skills.map((skill) => (
            <TouchableOpacity
              key={skill.id}
              style={[
                styles.gridItem,
                skill.checked && styles.gridItemSelected,
              ]}
              onPress={() => handleCheckBoxClick(skill.id)}
            >
              <Image source={skill.image} style={styles.image} />
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={skill.checked}
                  onClick={() => handleCheckBoxClick(skill.id)}
                  isChecked={skill.checked}
                  checkBoxColor={skill.checked ? "green" : undefined}
                  style={{
                    backgroundColor: skill.checked ? "white" : "transparent",
                  }}
                />
              </View>
              <Text style={styles.gridText}>{skill.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, isContinueDisabled && styles.disabledButton]}
        disabled={isContinueDisabled}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // backgroundColor: "#EFEFF9",
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
    color:"black"
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 5,
  },
  gridItem: {
    width: width * 0.45,
    height: height * 0.2,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    
  },
  gridItemSelected: {
    borderColor: "green",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "60%",
    resizeMode: "contain",
  },
  gridText: {
    paddingTop: 2,
    fontSize: 15,
    textAlign: "center",
    color:"black"
  },
  checkboxContainer: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    marginBottom: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
});

export default CategoryScreen;
