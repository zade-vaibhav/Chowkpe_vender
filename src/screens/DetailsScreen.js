import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const DetailsScreen = ({ navigation }) => {
  const [workType, setWorkType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [location, setLocation] = useState("");
  const [workers, setWorkers] = useState(null)
  const [description, setDescription] = useState("")
  const [selectedImage, setSelectedImage] = useState(null);
  const [salary, setSalary] = useState(null)
  const [pf, setPf] = useState(null)
  const [esi, setEsi] = useState(null)
  const [food, setFood] = useState(null)
  const [accomodation, setAccomodation] = useState(null)
  

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisibleDocument, setDropdownVisibleDocument] = useState(false);
  const [dropdownVisibleCategory, setDropdownVisibleCategory] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select Starting Date");
  const [selectedDocument, setSelectedDocument] = useState('Select Document');
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  
 
  const [address, setAddress] = useState(null);
  const [desc, setDesc] = useState(null)
  const [salaryRange, setSalaryRange] = useState(null)
  const dates = ["Immediately", "Within 10 Days", "Within 15 days", "Within 1 month"];
  const requiredDocuments = ['ID Proof', 'Address Proof'];
  const hireCategories = ['Cleaning', 'Shipping'];


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

  const handleAddDescription = ()=>{
    if(description.trim()){
      setDesc(description)
      setDescription("");
    }
  }

  const handleSalaryRange =()=>{
    if(salary.trim()){
      setSalaryRange(salary);
      setSalary("");
    }
  }

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const isSubmitEnabled = () => {
    return (
      workers !== "" &&
      description !== "" &&
      selectedImage !== null &&
      selectedDocument !== "" &&
      selectedCategory !== "" &&
      salary !== "" &&
      pf !== "" &&
      esi !== "" &&
      food !== "" &&
      accommodation !== ""
    );
  };


  const handleSubmit = () => {
    console.log("Form submitted");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/Forklifter.png")}
            style={styles.operatorImage}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Forklift Operator</Text>
          <Text style={styles.center}>Today</Text>
        </View>
        <View style={styles.messageBox}>
          <Image
            source={require("../../assets/chowkpe.png")}
            style={styles.logoImage}
          />
          <Text style={styles.message}>👋 Hi there! Welcome to Chowkpe!</Text>
          <Text style={styles.dateText}>25 Jan 24</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.messageBox}>
            <Image
              source={require("../../assets/chowkpe.png")}
              style={styles.logoImage}
            />
            <Text style={styles.sectionText}>Select Work Type</Text>
            <Text style={styles.dateText}>25 Jan 24</Text>
          </View>
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
          <View style={styles.messageBox}>
            <Image
              source={require("../../assets/chowkpe.png")}
              style={styles.logoImage}
            />
            <Text style={styles.sectionText}>Select Starting Date</Text>
            <Text style={styles.dateText}>25 Jan 24</Text>
          </View>
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
          <View style={styles.requestCallbackBox}>
          <TouchableOpacity style={styles.phoneButton}>
              <Icon name="call" size={24} color="#fff" />
           </TouchableOpacity>
            <Text style={styles.requestButtonText}>Request Callback</Text>
          </View>
        </View>
        <View style={styles.section}>
        <View style={styles.messageBox}>
            <Image
              source={require("../../assets/chowkpe.png")}
              style={styles.logoImage}
            />
            <Text style={styles.sectionText}>Enter your location</Text>
            <Text style={styles.dateText}>25 Jan 24</Text>
          </View>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter address"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddAddress}
          >
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
          <View style={styles.messageBox}>
            <Image
              source={require("../../assets/chowkpe.png")}
              style={styles.logoImage}
            />
            <Text style={styles.sectionText}>How many workers do you need ?</Text>
            <Text style={styles.dateText}>25 Jan 24</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                workers === "1 worker" && styles.selectedButton,
              ]}
              onPress={() => setWorkers("1 worker")}
            >
              <Text
                style={[
                  styles.buttonText,
                  workers === "1 worker" && styles.selectedButtonText,
                ]}
              >
                1 worker
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                workers === "2 worker" && styles.selectedButton,
              ]}
              onPress={() => setWorkers("2 worker")}
            >
              <Text
                style={[
                  styles.buttonText,
                  workers === "2 worker" && styles.selectedButtonText,
                ]}
              >
                2 worker
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                workers === "2 + worker" && styles.selectedButton,
              ]}
              onPress={() => setWorkers("2 + worker")}
            >
              <Text
                style={[
                  styles.buttonText,
                  workers === "2 + worker" && styles.selectedButtonText,
                ]}
              >
                2 + worker 
              </Text>
            </TouchableOpacity>
          </View>
          {workers && (
            <View style={styles.selectedWorkTypeContainer}>
              <TouchableOpacity style={styles.editIconContainer}>
                <Icon name="pencil" size={16} color="gray" />
              </TouchableOpacity>
              <View style={styles.workTypeTextContainer}>
                <Text style={styles.selectedWorkTypeText}>{workers}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <View style={styles.requestCallbackBox}>
          <TouchableOpacity style={styles.phoneButton}>
              <Icon name="call" size={24} color="#fff" />
           </TouchableOpacity>
            <Text style={styles.requestButtonText}>Request Callback</Text>
          </View>
        </View>
        <View style={styles.section}>
        <View style={styles.messageBox}>
            <Image
              source={require("../../assets/chowkpe.png")}
              style={styles.logoImage}
            />
            <Text style={styles.sectionText}>Write work description</Text>
            <Text style={styles.dateText}>25 Jan 24</Text>
          </View>
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
      <View style={styles.messageBox}>
        <Image
          source={require('../../assets/chowkpe.png')}
          style={styles.logoImage}
        />
        <Text style={styles.sectionText}>Add Photos of your work</Text>
        <Text style={styles.dateText}>25 Jan 24</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={openCamera}
        >
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={openGallery}
        >
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>
      {selectedImage && (
        <View style={styles.selectedWorkTypeContainer}>
          <TouchableOpacity style={styles.editIconContainer}>
            <Icon name="pencil" size={16} color="gray" />
          </TouchableOpacity>
          <View style={styles.imageTypeContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
          </View>
        </View>
      )}
    </View>
    <View style={styles.section}>
  <View style={styles.messageBox}>
    <Image
      source={require('../../assets/chowkpe.png')}
      style={styles.logoImage}
    />
    <Text style={styles.sectionText}>Select Required Documents</Text>
    <Text style={styles.dateText}>25 Jan 24</Text>
  </View>
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
            selectedDocument === document && styles.selectedDropdownItem,
          ]}
          onPress={() => handleSelectDocument(document)}
        >
          <Text
            style={[
              styles.dropdownItemText,
              selectedDocument === document && styles.selectedDropdownItemText,
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
  <View style={styles.messageBox}>
    <Image
      source={require('../../assets/chowkpe.png')}
      style={styles.logoImage}
    />
    <Text style={styles.sectionText}>Select Hire Category</Text>
    <Text style={styles.dateText}>25 Jan 24</Text>
  </View>
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
            selectedCategory === category && styles.selectedDropdownItem,
          ]}
          onPress={() => handleSelectCategory(category)}
        >
          <Text
            style={[
              styles.dropdownItemText,
              selectedCategory === category && styles.selectedDropdownItemText,
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
        <View style={styles.messageBox}>
            <Image
              source={require("../../assets/chowkpe.png")}
              style={styles.logoImage}
            />
            <Text style={styles.sectionText}>Salary Range</Text>
            <Text style={styles.dateText}>25 Jan 24</Text>
          </View>
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
          <View style={styles.messageBox}>
            <Image
              source={require("../../assets/chowkpe.png")}
              style={styles.logoImage}
            />
            <Text style={styles.sectionText}>PF</Text>
            <Text style={styles.dateText}>25 Jan 24</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                pf === "Yes" && styles.selectedButton,
              ]}
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
              style={[
                styles.button,
                pf === "No" && styles.selectedButton,
              ]}
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
          <View style={styles.messageBox}>
            <Image
              source={require("../../assets/chowkpe.png")}
              style={styles.logoImage}
            />
            <Text style={styles.sectionText}>ESI</Text>
            <Text style={styles.dateText}>25 Jan 24</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                esi === "Yes" && styles.selectedButton,
              ]}
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
              style={[
                styles.button,
                esi === "No" && styles.selectedButton,
              ]}
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
          <View style={styles.messageBox}>
            <Image
              source={require("../../assets/chowkpe.png")}
              style={styles.logoImage}
            />
            <Text style={styles.sectionText}>Food</Text>
            <Text style={styles.dateText}>25 Jan 24</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                food === "Yes" && styles.selectedButton,
              ]}
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
              style={[
                styles.button,
                food === "No" && styles.selectedButton,
              ]}
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
          <View style={styles.messageBox}>
            <Image
              source={require("../../assets/chowkpe.png")}
              style={styles.logoImage}
            />
            <Text style={styles.sectionText}>Accomodation</Text>
            <Text style={styles.dateText}>25 Jan 24</Text>
          </View>
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
        {/* <View style={styles.section}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitEnabled() ? styles.submitButtonEnabled : styles.submitButtonDisabled
            ]}
            disabled={!isSubmitEnabled()}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>     */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
  backButtonImage: {
    marginLeft: -14,
    width: 84,
    height: 84,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  operatorImage: {
    width: "80%",
    height: 150,
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
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: "60%",
    alignSelf: "flex-end"
  },
  phoneButton: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 50,
  },
  requestButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderColor: '#ccc',
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
    width: "40%"
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  imageTypeContainer: {
    padding: 20,
    borderRadius: 10,
  },
  submitButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  submitButtonEnabled: {
    backgroundColor: "#4CAF50",
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
