import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';

const RegistrationScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    password: '',
    confirmpassword: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please Enter email ID', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please Enter valid email ID', 'email');
      isValid = false;
    }else if (inputs.email !== inputs.email){
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.firstname) {
      handleError('Please Enter Your FirstName', 'firstname');
      isValid = false;
    }


    if (!inputs.lastname) {
      handleError('Please Enter Your LastName', 'lastname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please Enter Your Phone Number', 'phone');
      isValid = false;
    }else if (!inputs.phone.match(/^[0-9\b]+$/)) {
      handleError('Please Enter valid phone ID', 'phone');
      isValid = false;
    }else if (inputs.phone.length != 10) {
      handleError('Please Enter valid phone ID', 'phone');
      isValid = false;
    }


    /*if (!inputs.phone) {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(!inputs.phone)) {
        isValid = false;
        errors["phone"] = "Please enter only number.";
      }else if(!inputs.phone.length != 10){
        isValid = false;
        errors["phone"] = "Please enter valid phone number.";
      }
    }*/


    if (!inputs.password) {
      handleError('Please Enter password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (!inputs.confirmpassword) {
      handleError('Please Enter confirmpassword', 'confirmpassword');
      isValid = false;
    } else if (inputs.password && inputs.confirmpassword !== inputs.password) {
      handleError('Password And ConfirmPassword Are Not Match', 'confirmpassword');
      isValid = false;
    }
    

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('LoginScreen');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Register
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Register
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'firstname')}
            onFocus={() => handleError(null, 'firstname')}
            iconName="account-outline"
            label="First Name"
            placeholder="Enter your First Name"
            error={errors.firstname}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'lastname')}
            onFocus={() => handleError(null, 'lastname')}
            iconName="account-outline"
            label="Last Name"
            placeholder="Enter your Last Name"
            error={errors.lastname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="contacts"
            label="Phone Number"
            placeholder="Enter your Phone No"
            error={errors.phone}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Input
            onChangeText={text => handleOnchange(text, 'confirmpassword')}
            onFocus={() => handleError(null, 'ConfirmPassword')}
            iconName="lock-check"
            label="confirmpassword"
            placeholder="Enter your confirmpassword"
            error={errors.confirmpassword}
            confirmpassword
          />
             

          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have account ?Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;