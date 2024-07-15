import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get('window');

const OtpScreen = ({navigation}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
        otpInputsRefs.current[index + 1].focus();
      } else if (!value && index > 0) {
        otpInputsRefs.current[index - 1].focus();
      }
    };

  const otpInputsRefs = useRef([]);
  
  const isOtpComplete = otp.every(digit => digit.length === 1);

  const handleVerify = ()=>{
    navigation.navigate('Select Category')
  }

  return (
    <SafeAreaView style={styles.container}>
      
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <ImageBackground source={require("../../assets/LoginScreen.png")} style={styles.imageBackground} />
            <View style={styles.otpContainer}>
              <Text style={styles.title}>Verify Phone Number</Text>
              <Text style={styles.subtitle}>
                We Have Sent Code To Your Phone Number
              </Text>
              <Text style={styles.dynamicText}>**********</Text>
              <View style={styles.otpInputs}>
                {[0, 1, 2, 3].map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (otpInputsRefs.current[index] = ref)}
                    style={[
                      styles.otpInput,
                      index !== 0 && styles.otpInputMarginLeft,
                    ]}
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChangeText={(value) => handleOtpChange(index, value)}
                    placeholder="-"
                    placeholderTextColor="gray"
                  />
                ))}
              </View>
              <Text style={styles.resendText}>
                Did not receive the OTP yet? <Text style={styles.goBackText}>Resend in 60 sec</Text>
              </Text>
            </View>
          </ScrollView>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.verifyButton, { backgroundColor: isOtpComplete ? "#007BFF" : "#ccc" }]}
              disabled={!isOtpComplete}
              onPress={handleVerify}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    height: height*0.5,
    resizeMode: "cover"
  },
  innerContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  otpContainer: {
    paddingHorizontal: 20,
    paddingVertical: 70,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.06, 
    marginBottom: 10,
    fontWeight: "500",
    textAlign: "left",
    color: "black",
  },
  subtitle: {
    fontSize: width * 0.04, 
    color: "#888",
    marginBottom: 10,
  },
  dynamicText: {
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    fontSize: width * 0.05, 
  },
  otpInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 30,
  },
  otpInput: {
    width: width * 0.15, 
    height: width * 0.15, 
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    textAlign: "center",
    fontSize: width * 0.05, 
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    backgroundColor: "#fff",
    color: "black",
  },
  otpInputMarginLeft: {
    marginLeft: width * 0.02, 
  },
  resendText: {
    fontSize: width * 0.04, 
    color: "#888",
    marginBottom: 20,
    textAlign: "center",
  },
  goBackText: {
    color: "navy",
    fontWeight: "600",
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
  },
  verifyButton: {
    paddingVertical: 13,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
  },
  verifyButtonText: {
    color: "white",
    fontSize: width * 0.04, 
    textAlign: "center",
    fontWeight: "600",
  },
});

export default OtpScreen;
