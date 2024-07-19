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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

const formatDate = (date) => {
  const options = { day: '2-digit', month: 'short', year: '2-digit' };
  return date.toLocaleDateString('en-GB', options);
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
  const [workType, setWorkType] = useState(skill?.workType || "");
  const [selectedDate, setSelectedDate] = useState(skill?.startingDate || "");
  const [location, setLocation] = useState(skill?.Address || "");
  const [workers, setWorkers] = useState(skill?.workerNumber || "");
  const [description, setDescription] = useState(skill?.desc || "");
  const [selectedImages, setSelectedImages] = useState(Array.isArray(skill?.jobPhotos) ? skill.jobPhotos.map(photo => (typeof photo === "number" ? Image.resolveAssetSource(photo).uri : photo)) : []);
  const [salary, setSalary] = useState(skill?.salaryRange || "");
  const [pf, setPf] = useState(skill?.PF || "");
  const [esi, setEsi] = useState(skill?.ESI || "");
  const [food, setFood] = useState(skill?.Food || "");
  const [accomodation, setAccomodation] = useState(skill.Accomodation || "");

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisibleDocument, setDropdownVisibleDocument] = useState(false);
  const [dropdownVisibleCategory, setDropdownVisibleCategory] = useState(false);
  const [selectedItem, setSelectedItem] = useState(skill?.startingDate || "Select Starting Date");
  const [selectedDocument, setSelectedDocument] = useState(skill?.requiredDocuments || "Select Document");
  const [selectedCategory, setSelectedCategory] = useState(skill?.hireCategory || "Select Category");

  const [workerNumber, setWorkerNumber] = useState(skill?.workerNumber || "");
  const [address, setAddress] = useState(skill?.Address || "");
  const [desc, setDesc] = useState(skill?.desc || "");
  const [salaryRange, setSalaryRange] = useState(skill?.salaryRange || "");
  const [isAdding, setIsAdding] = useState(false);
  const dates = [
    "Immediately",
    "Within 10 Days",
    "Within 15 days",
    "Within 1 month",
  ];
  const requiredDocuments = ["ID Proof", "Address Proof"];
  const hireCategories = ["Cleaner", "Shipping", "Picker", "Forklift Operator", "Sorter", "Assemble Line Worker"];

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
    setSelectedDocument(document);
    setDropdownVisibleDocument(false);
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

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
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
    if (!workerNumber.trim()) {
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
    Alert.alert("Please enter a valid salary range (e.g., 1000 or 10000-20000).");
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
    if (!pf) {
      Alert.alert("Please select PF confimation.");
      return;
    }
    if (!esi) {
      Alert.alert("Please select ESI confimation.");
      return;
    }
    if (!food) {
      Alert.alert("Please select Food confimation.");
      return;
    }
    if (!accomodation) {
      Alert.alert("Please select accomodation confimation.");
      return;
    }

    setIsAdding(true);
    const formData = new FormData();
    formData.append("workType", workType);
    formData.append("selectedDate", selectedDate);
    formData.append("address", address);
    formData.append("workerNumber", workerNumber);
    formData.append("desc", desc);
    selectedImages.forEach((imageUri, index) => {
      formData.append(`image_${index}`, {
        uri: imageUri,
        type: "image/jpeg",
        name: `image_${index}.${imageUri.split(".").pop()}`,
      });
    });
    formData.append("selectedDocuments", selectedDocument);
    formData.append("selectedCategory", selectedCategory);
    formData.append("salaryRange", salaryRange);
    formData.append("pf", pf);
    formData.append("esi", esi);
    formData.append("food", food);
    formData.append("accomodation", accomodation);

    console.log("FormData: ", formData);

    try {
      const response = await fetch(
        "https://chowkpe-server.onrender.com/api/v1/admin/tasks/create",
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      alert("Task created successfully");
      console.log(data);
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
      setAccomodation("")
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
          <Image
            source={skill.image}
            style={styles.operatorImage}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>{skill.title}</Text>
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
                workType === "Part Time" && styles.selectedButton,
              ]}
              onPress={() => setWorkType("Part Time")}
            >
              <Text
                style={[
                  styles.buttonText,
                  workType === "Part Time" && styles.selectedButtonText,
                ]}
              >
                Part Time
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
        <RequestCallbackBox />
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
        <RequestCallbackBox />
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
          <HeadingBox name="Select Required Documents" />
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdownDocument}
          >
            <Text style={styles.dropdownButtonText}>{selectedDocument}</Text>
          </TouchableOpacity>
          {dropdownVisibleDocument && (
            <View style={styles.dropdown}>
              {requiredDocuments.map((document, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    selectedDocument === document &&
                      styles.selectedDropdownItem,
                  ]}
                  onPress={() => handleSelectDocument(document)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedDocument === document &&
                        styles.selectedDropdownItemText,
                    ]}
                  >
                    {document}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="Select Hire Category" />
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdownCategory}
          >
            <Text style={styles.dropdownButtonText}>{selectedCategory}</Text>
          </TouchableOpacity>
          {dropdownVisibleCategory && (
            <View style={styles.dropdown}>
              {hireCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    selectedCategory === category &&
                      styles.selectedDropdownItem,
                  ]}
                  onPress={() => handleSelectCategory(category)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedCategory === category &&
                        styles.selectedDropdownItemText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
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
              style={[styles.button, pf === "Yes" && styles.selectedButton]}
              onPress={() => setPf("Yes")}
            >
              <Text
                style={[
                  styles.buttonText,
                  pf === "Yes" && styles.selectedButtonText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, pf === "No" && styles.selectedButton]}
              onPress={() => setPf("No")}
            >
              <Text
                style={[
                  styles.buttonText,
                  pf === "No" && styles.selectedButtonText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
          {pf && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>{pf}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="ESI" />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, esi === "Yes" && styles.selectedButton]}
              onPress={() => setEsi("Yes")}
            >
              <Text
                style={[
                  styles.buttonText,
                  esi === "Yes" && styles.selectedButtonText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, esi === "No" && styles.selectedButton]}
              onPress={() => setEsi("No")}
            >
              <Text
                style={[
                  styles.buttonText,
                  esi === "No" && styles.selectedButtonText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
          {esi && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>{esi}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <HeadingBox name="Food" />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, food === "Yes" && styles.selectedButton]}
              onPress={() => setFood("Yes")}
            >
              <Text
                style={[
                  styles.buttonText,
                  food === "Yes" && styles.selectedButtonText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, food === "No" && styles.selectedButton]}
              onPress={() => setFood("No")}
            >
              <Text
                style={[
                  styles.buttonText,
                  food === "No" && styles.selectedButtonText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
          {food && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>{food}</Text>
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
                accomodation === "Yes" && styles.selectedButton,
              ]}
              onPress={() => setAccomodation("Yes")}
            >
              <Text
                style={[
                  styles.buttonText,
                  accomodation === "Yes" && styles.selectedButtonText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                accomodation === "No" && styles.selectedButton,
              ]}
              onPress={() => setAccomodation("No")}
            >
              <Text
                style={[
                  styles.buttonText,
                  accomodation === "No" && styles.selectedButtonText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
          {accomodation && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>{accomodation}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
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
    color:"black"
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
    resizeMode: "contain"
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
