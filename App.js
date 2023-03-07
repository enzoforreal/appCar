
import { SafeAreaView, Text, View, StatusBar  } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Bookings from "./components/Bookings";
import EditProfile from "./components/EditProfile";
import RentCar from './components/RentCar';
import CarDetails from './components/CarDetails';
import BookingMap from './components/BookingMap';
import Motorcycle from './components/Motorcycle';
import MotorcycleSettings from './components/MotorcycleSettings';
import RentMotorcycle from './components/RentMotorcycle';
import MotorcycleDetails from './components/MotorcycleDetails';
import MotorcycleBookings from './components/MotorcycleBookings';
import { auth } from './components/Firebase';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";



const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
 
      setLoading(false);
    });
  }, []);

  if (loading) return null; // Render loading/splash screen etc

  if (!authenticated) {
    return (
      
      <>

      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name='SignIn' component={SignIn}/>
      </Stack.Navigator>
      </>
    );
  }

  return(
    <>

    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="RentCar" component={RentCar} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CarDetails" component={CarDetails} />
      <Stack.Screen name="BookingMap" component={BookingMap} />
      <Stack.Screen name="Bookings" component={Bookings} />
      <Stack.Screen name="Motorcycle" component={Motorcycle} />
      <Stack.Screen name="MotorcycleSettings" component={MotorcycleSettings} />
      <Stack.Screen name="RentMotorcycle" component={RentMotorcycle} />
      <Stack.Screen name="MotorcycleDetails" component={MotorcycleDetails} />
      <Stack.Screen name="MotorcycleBookings" component={MotorcycleBookings} />
    </Stack.Navigator>
    </>
  );
}

  
export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
          <Navigator />
      </NavigationContainer>
  </TailwindProvider>
  );
}

