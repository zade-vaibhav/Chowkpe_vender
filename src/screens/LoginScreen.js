import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import IntlPhoneInput from "react-native-intl-phone-input";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [phoneInputWidth, setPhoneInputWidth] = useState(width);
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);

  const handlePhoneNumberChange = ({
    phoneNumber,
    dialCode,
    unmaskedPhoneNumber,
    isVerified,
  }) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\s+/g, "");
    setPhoneNumber(cleanedPhoneNumber);
    const phoneRegex = /^\+\d{1,3}\d{11}$/;
    if (phoneRegex.test(dialCode + unmaskedPhoneNumber)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout;
    setPhoneInputWidth(width);
  }, []);

  const handleVerify = async () => {
    setLoadingSendOtp(true);
    if (!phoneNumber) {
      Alert.alert("Please enter a phone number");
      return;
    }
    try {
      const response = await fetch(
        "https://chowkpe-server.onrender.com/api/v1/vender/send_otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile_number: phoneNumber,
          }),
        }
      );

      const data = await response.json();

      if (data.success == true) {
        setLoadingSendOtp(false);
        Alert.alert(data.message);
        navigation.replace("OtpNew", { phoneNumber });
        setPhoneNumber("");
      } else {
        setLoadingSendOtp(false);
        Alert.alert(data.message);
      }
    } catch (error) {
      setLoadingSendOtp(false);
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../assets/LoginScreen.png")}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Create Your Account</Text>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.centerText}>Login or Sign Up</Text>
            <View style={styles.line} />
          </View>
          <Text style={styles.label}>Mobile Number</Text>
          <View onLayout={handleLayout} style={styles.phoneInputWrapper}>
            <IntlPhoneInput
              onChangeText={handlePhoneNumberChange}
              defaultCountry="IN"
              placeholder="Enter Mobile Number"
              containerStyle={styles.phoneInput}
              phoneInputStyle={styles.input}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        {loadingSendOtp ? (
          <TouchableOpacity
            style={[
              styles.button,
              {
                width: phoneInputWidth,
                backgroundColor: isValid ? "#007BFF" : "#ccc",
              },
            ]}
            disabled={!isValid}
          >
            <ActivityIndicator
              size="small"
              color="#fff"
              style={styles.spinner}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              {
                width: phoneInputWidth,
                backgroundColor: isValid ? "#007BFF" : "#ccc",
              },
            ]}
            disabled={!isValid}
            onPress={handleVerify}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  image: {
    width: "100%",
    height: height * 0.5,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: "gray",
  },
  centerText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  phoneInputWrapper: {
    width: "100%",
  },
  phoneInput: {
    width: "100%",
    marginBottom: 10,
    height: 65,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 50,
  },
  buttonWrapper: {
    // position: "absolute",
    // bottom: 10,
    // width: "100%",
    // alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;