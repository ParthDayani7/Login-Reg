import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import Button from '../components/Button';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
});
const RootStack = createNativeStackNavigator();

const HomeScree = ({navigation}) => {
  


  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({...userDetails, loggedIn: false}),
    );
    navigation.navigate('LoginScreen');
  };

  const login = () => {
    <View>
      <Text>hiii</Text>
    </View>
  }

  return (
    
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
      }}>

        
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Welcome {userDetails?.firstname}
      </Text>
      <Button title="Logout" onPress={logout} />


    


    </View>
  );
};




export default HomeScree;