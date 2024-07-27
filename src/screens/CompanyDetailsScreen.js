import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CompanyDetailsScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState("");
  const [alternativeEmail, setAlternativeEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };
  const validatePan = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    return panRegex.test(pan);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handlePanChange = (text) => {
    setPan(text);
  };

  const handleContinue = async () => {
    setLoading(true);
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number."
      );
      setLoading(false);
      return;
    }
    // if (!validatePan(pan)) {
    //   Alert.alert("Invalid Pan Number", "Please enter a valid pan number.");
    //   setLoading(false);
    //   return;
    // }
    if (!validateEmail(email)) {
      Alert.alert(
        "Invalid Email Address",
        "Please enter a valid email address."
      );
      setLoading(false);
      return;
    }
    const token = await AsyncStorage.getItem("uid");
    try {
      const response = await fetch(
        "https://chowkpe-server.onrender.com/api/v1/vender/businesses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            businessType,
            businessName,
            name,
            contactNumber: phoneNumber,
            alternateContactNumber: alternativePhoneNumber,
            email,
            alternateEmail: alternativeEmail,
            address,
            gstOrPanNumber: pan,
          }),
        }
      );

      const data = await response.json();
      console.log("data", data);
      if (data.success == true) {
        setLoading(false);
        Alert.alert(data.message);
        navigation.replace("BottomNavigator");
      } else {
        setLoading(false);
        Alert.alert(data.message);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Company Details Screen</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Type</Text>
              <Picker
                selectedValue={businessType}
                onValueChange={(itemValue) => setBusinessType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select business type" value="" />
                <Picker.Item label="Cleaning" value="cleaning" />
                <Picker.Item
                  label="Forklift Operator"
                  value="Forklift Operator"
                />
                <Picker.Item label="Shipping" value="Shipping" />
                <Picker.Item label="Picker" value="Picker" />
                <Picker.Item
                  label="Assemble_Line_Worker"
                  value="Assemble_Line_Worker"
                />
                <Picker.Item label="Sorter" value="Sorter" />
                <Picker.Item label="Plumber" value="Plumber" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter business name"
                value={businessName}
                onChangeText={setBusinessName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Authorize Person Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter contact number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Alternative Contact Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter alternative contact number"
                keyboardType="phone-pad"
                value={alternativePhoneNumber}
                onChangeText={setAlternativePhoneNumber}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Alternative Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter alternative email address"
                keyboardType="email-address"
                value={alternativeEmail}
                onChangeText={setAlternativeEmail}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pan Number/GST Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your pan number"
                value={pan}
                onChangeText={setPan}
              />
            </View>
            {/* <View style={styles.inputGroup}>
              <Text style={styles.label}>GST Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your GST number"
              />
            </View> */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Company Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter company address"
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          {loading ? (
            <TouchableOpacity style={styles.buttonContainer}>
              <ActivityIndicator
                size="small"
                color="#000"
                style={styles.spinner}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.replace("BottomNavigator")}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    marginTop: "5%",
  },
  headerText: {
    fontSize: Dimensions.get("window").width * 0.05,
    fontWeight: "bold",
  },
  scrollContainer: {
    padding: Dimensions.get("window").width * 0.05,
    backgroundColor: "white",
    paddingBottom: 100, // to ensure scrolling doesn't overlap footer
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: Dimensions.get("window").height * 0.015,
  },
  label: {
    marginBottom: 5,
    fontSize: Dimensions.get("window").width * 0.035,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    fontSize: Dimensions.get("window").width * 0.04,
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    fontSize: Dimensions.get("window").width * 0.04,
  },
  footer: {
    padding: Dimensions.get("window").width * 0.05,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#3B82F6",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: Dimensions.get("window").width * 0.04,
    fontWeight: "bold",
  },
  skipText: {
    textAlign: "center",
    color: "#888",
    marginTop: 10,
    fontSize: Dimensions.get("window").width * 0.035,
  },
});

export default CompanyDetailsScreen;
