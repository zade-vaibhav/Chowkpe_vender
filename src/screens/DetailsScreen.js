import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const formatDate = (date) => {
  const options = { day: "2-digit", month: "short", year: "2-digit" };
  return date.toLocaleDateString("en-GB", options);
};

const RequestCallbackBox = () => {
  return (
    <View style={styles.section}>
      <View style={styles.requestCallbackBox}>
        <TouchableOpacity style={styles.phoneButton}>
          <Icon name="call" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.requestButtonText}>Request Callback</Text>
      </View>
    </View>
  );
};

const HeadingBox = (props) => {
  const today = new Date();
  return (
    <View style={styles.messageBox}>
      <Image
        source={require("../../assets/chowkpe.png")}
        style={styles.logoImage}
      />
      <Text style={styles.sectionText}>{props.name}</Text>
      <Text style={styles.dateText}>{formatDate(today)}</Text>
    </View>
  );
};

const DetailsScreen = ({ route, navigation }) => {
  const today = new Date();
  const { skill } = route.params;
  const [workType, setWorkType] = useState(skill?.workingPeriod || "");
  const [selectedDate, setSelectedDate] = useState(
    skill?.workStartingPeriod || ""
  );
  const [location, setLocation] = useState(skill?.addressLocation || "");
  const [workers, setWorkers] = useState(skill?.numberOfWorkers || "");
  const [description, setDescription] = useState(skill?.jobDescription || "");
  const [selectedImages, setSelectedImages] = useState([]);
  // console.log(selectedImages);
  const [salary, setSalary] = useState(skill?.salaryRange || "");
  const [pf, setPf] = useState(skill?.pf || null);
  const [esi, setEsi] = useState(skill?.esi || null);
  const [food, setFood] = useState(skill?.food || null);
  const [accomodation, setAccomodation] = useState(skill.accommodation || null);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisibleDocument, setDropdownVisibleDocument] = useState(false);
  const [dropdownVisibleCategory, setDropdownVisibleCategory] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    skill?.workStartingPeriod || "Select Starting Date"
  );
  const [document,setDocument]= useState()
  const [selectedDocument, setSelectedDocument] = useState(
    skill?.documentsRequired
  );

  const [selectedCategory, setSelectedCategory] = useState(
    skill?.hireCategory || skill.title
  );
  const [customCategory, setCustomCategory] = useState("");

  const [workerNumber, setWorkerNumber] = useState(
    skill?.numberOfWorkers || ""
  );
  const [address, setAddress] = useState(skill?.addressLocation || "");
  const [desc, setDesc] = useState(skill?.jobDescription || "");
  const [salaryRange, setSalaryRange] = useState(skill?.salaryRange || "");
  const [isAdding, setIsAdding] = useState(false);
  const dates = [
    "Immediate",
    "Within 10 days",
    "Within 15 days",
    "Within 30 days",
  ];

  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleDropdownDocument = () => {
    setDropdownVisibleDocument(!dropdownVisibleDocument);
  };

  const toggleDropdownCategory = () => {
    setDropdownVisibleCategory(!dropdownVisibleCategory);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSelectedDate(item);
    setDropdownVisible(false);
  };

  const handleSelectDocument = (document) => {
    setDocument(document);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisibleCategory(false);
  };

  const handleAddAddress = () => {
    if (location.trim()) {
      setAddress(location);
      setLocation("");
    }
  };

  const handleWorkersNumber = () => {
    if (workers.trim()) {
      setWorkerNumber(workers);
      setWorkers("");
    }
  };

  const handleAddDescription = () => {
    if (description.trim()) {
      setDesc(description);
      setDescription("");
    }
  };

  const handleSalaryRange = () => {
    if (salary.trim()) {
      setSalaryRange(salary);
      setSalary("");
    }
  };
  const handleCustomCategoryChange = () => {
    setSelectedCategory(customCategory);
    setCustomCategory("");
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workType) {
      Alert.alert("Please select a work type.");
      return;
    }
    if (!selectedDate) {
      Alert.alert("Please select a starting date.");
      return;
    }
    if (!address.trim()) {
      Alert.alert("Please enter a location.");
      return;
    }
    if (address.trim().length < 10) {
      Alert.alert("Please enter a valid location with at least 10 characters.");
      return;
    }
    if (!workerNumber) {
      Alert.alert("Please enter a worker Number.");
      return;
    }
    if (isNaN(workerNumber) || parseInt(workerNumber) < 1) {
      Alert.alert("Please enter a valid worker number (1 or greater).");
      return;
    }
    if (!desc.trim()) {
      Alert.alert("Please enter work description.");
      return;
    }
    if (desc.trim().length < 10) {
      Alert.alert(
        "Please enter a valid work description with at least 10 characters."
      );
      return;
    }
    if (!selectedImages) {
      Alert.alert("Please select an image.");
      return;
    }
    if (!selectedDocument || selectedDocument === "Select Document") {
      Alert.alert("Please select a required document.");
      return;
    }
    if (!selectedCategory || selectedCategory === "Select Category") {
      Alert.alert("Please select a hire category.");
      return;
    }
    const salaryRangePattern = /^(\d+)(-\d+)?$/;
    if (!salaryRange.trim()) {
      Alert.alert("Please select salary range.");
      return;
    }
    const salaryRangeMatch = salaryRange.trim().match(salaryRangePattern);
    if (!salaryRangeMatch) {
      Alert.alert(
        "Please enter a valid salary range (e.g., 1000 or 10000-20000)."
      );
      return;
    }
    const [_, minSalary, maxSalary] = salaryRangeMatch;
    if (parseInt(minSalary) < 1000) {
      Alert.alert("Minimum salary should be 1000 or greater.");
      return;
    }
    if (maxSalary && parseInt(maxSalary.slice(1)) < 1000) {
      Alert.alert("Maximum salary should be 1000 or greater.");
      return;
    }
    if (pf == null) {
      Alert.alert("Please select PF confimation.");
      return;
    }
    if (esi == null) {
      Alert.alert("Please select ESI confimation.");
      return;
    }
    if (food == null) {
      Alert.alert("Please select Food confimation.");
      return;
    }
    if (accomodation == null) {
      Alert.alert("Please select accomodation confimation.");
      return;
    }
   
    setIsAdding(true);
    const formData = new FormData();
    formData.append("workingPeriod", workType);
    formData.append("workStartingPeriod", selectedDate);
    formData.append("addressLocation", address);
    formData.append("numberOfWorkers", workerNumber);
    formData.append("jobDescription", desc);
    // selectedImages.forEach((imageUri, index) => {
    //   formData.append(jobPhotos, {
    //     uri: imageUri,
    //     type: "image/jpeg",
    //     name: image_${index}.${imageUri.split(".").pop()},
    //   });
    // });
    formData.append("jobPhotos", selectedImages);
    formData.append("documentsRequired", selectedDocument);
    formData.append("hireCategory", selectedCategory);
    formData.append("salaryRange", salaryRange);
    formData.append("pf", pf);
    formData.append("esi", esi);
    formData.append("food", food);
    formData.append("accommodation", accomodation);

    const token = await AsyncStorage.getItem("uid");
    if (!token) {
      Alert.alert("token is not valid please try again");
      return;
    }
   
    try {
      const response = await fetch(
        "https://chowkpe-server.onrender.com/api/v1/admin/tasks/create",
        {
          method: "POST",
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      Alert.alert("Task created successfully");
      setWorkType("");
      setSelectedDate("");
      setAddress("");
      setWorkerNumber("");
      setDesc("");
      setSelectedImages([]);
      setSelectedDocument("");
      setSelectedCategory("");
      setSalaryRange("");
      setPf("");
      setEsi("");
      setFood("");
      setAccomodation("");

      navigation.navigate("BottomNavigator");
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Details</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.imageContainer}>
          <Image source={skill.image} style={styles.operatorImage} />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>{selectedCategory !== "Other"
                ? selectedCategory
                : "Hire Category"}</Text>
        
          <Text style={styles.center}>Today</Text>
        </View>
        <View style={styles.messageBox}>
          <Image
            source={require("../../assets/chowkpe.png")}
            style={styles.logoImage}
          />
          <Text style={styles.message}>👋 Hi there! Welcome to Chowkpe!</Text>
          <Text style={styles.dateText}>{formatDate(today)}</Text>
        </View>

        <View style={styles.section}>
          <HeadingBox name="Select Hire Category" />
          <TouchableOpacity style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>
              {selectedCategory !== "Other"
                ? selectedCategory
                : "Hire Category"}
            </Text>
          </TouchableOpacity>
          {selectedCategory === "Other" && (
            <View>
              <TextInput
                style={styles.input}
                value={customCategory}
                onChangeText={setCustomCategory}
                placeholder="Enter Hire Category"
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleCustomCategoryChange}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <HeadingBox name="Select Work Type" />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                workType === "Full Time" && styles.selectedButton,
              ]}
              onPress={() => setWorkType("Full Time")}
            >
              <Text
                style={[
                  styles.buttonText,
                  workType === "Full Time" && styles.selectedButtonText,
                ]}
              >
                Full Time
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                workType === "Short Time" && styles.selectedButton,
              ]}
              onPress={() => setWorkType("Short Time")}
            >
              <Text
                style={[
                  styles.buttonText,
                  workType === "Short Time" && styles.selectedButtonText,
                ]}
              >
                Short Time
              </Text>
            </TouchableOpacity>
          </View>
          {workType && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>{workType}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="Select Starting Date" />
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdown}
          >
            <Text style={styles.dropdownButtonText}>{selectedItem}</Text>
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdown}>
              {dates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    selectedDate === date && styles.selectedDropdownItem,
                  ]}
                  onPress={() => handleSelectItem(date)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedDate === date && styles.selectedDropdownItemText,
                    ]}
                  >
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
       
        <View style={styles.section}>
          <HeadingBox name="Enter your location" />
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter address"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          {address && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>{address}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="How many workers do you need ?" />
          <TextInput
            style={styles.input}
            value={workers}
            onChangeText={setWorkers}
            placeholder="eg-20"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleWorkersNumber}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          {workerNumber && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>
                  {workerNumber} {workerNumber <= 1 ? "Worker" : "Workers"}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="Write work description" />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="write description"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddDescription}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          {desc && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>{desc}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="Add Photos of your work" />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={openCamera}>
              <Text style={styles.buttonText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openGallery}>
              <Text style={styles.buttonText}>Open Gallery</Text>
            </TouchableOpacity>
          </View>
          {selectedImages.length > 0 && (
            <View style={styles.selectedWorkTypeContainer}>
              {selectedImages.map((uri, index) => (
                <View key={index} style={styles.imageTypeContainer}>
                  <Image source={{ uri }} style={styles.selectedImage} />
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="Add Required Documents" />
          <TextInput
            style={styles.input}
            value={selectedDocument}
            onChangeText={setSelectedDocument}
            placeholder="eg. aadharCard,panCard"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={()=>handleSelectDocument(selectedDocument)}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          {document && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>{document}</Text>
              </View>
            </View>
          )}
        </View>
        

        <View style={styles.section}>
          <HeadingBox name="Salary Range" />
          <TextInput
            style={styles.input}
            value={salary}
            onChangeText={setSalary}
            placeholder="10000-20000"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleSalaryRange}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          {salaryRange && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>{salaryRange}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="PF" />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, pf === true && styles.selectedButton]}
              onPress={() => setPf(true)}
            >
              <Text
                style={[
                  styles.buttonText,
                  pf === true && styles.selectedButtonText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, pf === false && styles.selectedButton]}
              onPress={() => setPf(false)}
            >
              <Text
                style={[
                  styles.buttonText,
                  pf === false && styles.selectedButtonText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
          {pf !== null && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>
                  {pf == true ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="ESI" />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, esi === true && styles.selectedButton]}
              onPress={() => setEsi(true)}
            >
              <Text
                style={[
                  styles.buttonText,
                  esi === true && styles.selectedButtonText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, esi === false && styles.selectedButton]}
              onPress={() => setEsi(false)}
            >
              <Text
                style={[
                  styles.buttonText,
                  esi === false && styles.selectedButtonText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
          {esi !== null && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>
                  {esi == true ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="Food" />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, food === true && styles.selectedButton]}
              onPress={() => setFood(true)}
            >
              <Text
                style={[
                  styles.buttonText,
                  food === true && styles.selectedButtonText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, food === false && styles.selectedButton]}
              onPress={() => setFood(false)}
            >
              <Text
                style={[
                  styles.buttonText,
                  food === false && styles.selectedButtonText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
          {food !== null && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>
                  {food == true ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="Accomodation" />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                accomodation === true && styles.selectedButton,
              ]}
              onPress={() => setAccomodation(true)}
            >
              <Text
                style={[
                  styles.buttonText,
                  accomodation === true && styles.selectedButtonText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                accomodation === false && styles.selectedButton,
              ]}
              onPress={() => setAccomodation(false)}
            >
              <Text
                style={[
                  styles.buttonText,
                  accomodation === false && styles.selectedButtonText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
          {accomodation !== null && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>
                  {accomodation === true ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          {isAdding ? (
            <TouchableOpacity style={[styles.submitButton]}>
              <ActivityIndicator
                size="small"
                color="#fff"
                style={styles.spinner}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 15,
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
    justifyContent: "center",
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
  logoImage: {
    width: "14%",
    height: 19,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  operatorImage: {
    width: "90%",
    height: 200,
    resizeMode: "contain",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  messageBox: {
    backgroundColor: "#f5f5f5",
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
    marginLeft: "45%",
  },
  dateText: {
    fontSize: 14,
    color: "#007bff",
    textAlign: "right",
  },
  section: {
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  selectedButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#007bff",
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedButtonText: {
    color: "#fff",
  },
  dropdownButton: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  dropdownButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemText: {
    fontSize: 16,
  },
  selectedDropdownItem: {
    backgroundColor: "#007bff",
  },
  selectedDropdownItemText: {
    color: "#fff",
  },
  selectedWorkTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  workTypeTextContainer: {
    padding: 20,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  selectedWorkTypeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editIconContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editIcon: {
    marginRight: 5,
  },
  requestCallbackBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    alignSelf: "flex-end",
  },
  phoneButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 50,
  },
  requestButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "40%",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  imageTypeContainer: {
    padding: 20,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  submitButtonEnabled: {
    backgroundColor: "#007bff",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DetailsScreen;