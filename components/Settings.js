import { View, Text, SafeAreaView, TouchableOpacity, Image, Button } from 'react-native'
import React, {useLayoutEffect, useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from "firebase/auth";
import { auth } from './Firebase';
import { avatar } from '../assets/index';
import { AntDesign, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Settings = () => {
    const navigate = useNavigation();
    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false,
        });

    }, []); 
    
    //Firebase config
    const user = auth.currentUser;
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    //Download Profile Picture
    const storage = getStorage();
    const starsRef = ref(storage, (`Profile-Pictures/${user.uid}`));
    const[downloadURL, setDownloadURL] = useState()
    useEffect(() => {
      getDownloadURL(starsRef)
      .then((downloadURL) => {
        // Insert url into an <img> tag to "download"
        setDownloadURL(downloadURL)
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      })});

  return (
    <SafeAreaView>
        {/* <View className="mt-11">
        
        </View> */}
        <View className="p-4 mt-10 flex-row space-x-4">
            <TouchableOpacity onPress={() => navigate.navigate('Profile', {name: 'Profile'})}>
                        <Animatable.View 
                        animation={"pulse"}
                        easing={'ease-in-out'}
                        className="">
                            <Ionicons name="ios-arrow-back" size={32} color="black" />
                        
                        </Animatable.View>
            </TouchableOpacity>
            <Text className="font-bold text-xl">Profile</Text>
        </View>
        <View className="p-4 flex-row space-x-4">
            <TouchableOpacity  className="w-20 h-20  rounded-full">
                {downloadURL && <Image source={{uri: downloadURL}} className="w-20 h-20 rounded-full"/>}
            </TouchableOpacity>
            <Text className="font-bold text-xl mt-4">{user.displayName}</Text>
        </View>
        <View className="flex-col mt-12 space-y-7">
                <View className="flex-row space-x-2 p-4 justify-between bg-[#dfdfdf] rounded-full">
                    <View className="flex-row space-x-2">
                        <AntDesign name="user" size={24} color="black" />
                        <Text>Edit profile</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate.navigate("EditProfile")}>
                        <Animatable.View 
                        animation={"pulse"}
                        easing={'ease-in-out'}
                        className="">
                            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                        
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
                <View className="flex-row space-x-2 p-4 justify-between bg-[#dfdfdf] rounded-full">
                    <View className="flex-row space-x-2">
                        <AntDesign name="car" size={24} color="black" />
                        <Text>Rent your car</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate.navigate("RentCar")}>
                        <Animatable.View 
                        animation={"pulse"}
                        easing={'ease-in-out'}
                        className="">
                            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                        
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
                <View className="flex-row space-x-2 p-4 justify-between bg-[#dfdfdf] rounded-full">
                    <View className="flex-row space-x-2">
                        <Entypo name="ticket" size={24} color="black" />
                        <Text>My booking</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate.navigate('Bookings', {name: 'Bookings'})}>
                        <Animatable.View 
                        animation={"pulse"}
                        easing={'ease-in-out'}
                        className="">
                            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                        
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
                <View className="flex-row space-x-2 p-4 justify-between bg-[#dfdfdf] rounded-full">
                    <View className="flex-row space-x-2">
                        <AntDesign name="bells" size={24} color="black" />
                        <Text>Notification</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate.navigate('Settings', {name: 'Settings'})}>
                        <Animatable.View 
                        animation={"pulse"}
                        easing={'ease-in-out'}
                        className="">
                            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                        
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
                <View className="flex-row space-x-2 p-4 justify-between bg-[#dfdfdf] rounded-full">
                    <View className="flex-row space-x-2">
                        <AntDesign name="exclamationcircleo" size={24} color="black" />
                        <Text>Terms and condition</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate.navigate('Settings', {name: 'Settings'})}>
                        <Animatable.View 
                        animation={"pulse"}
                        easing={'ease-in-out'}
                        className="">
                            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                        
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
                <View className="p-4 ">
                    <TouchableOpacity  onPress={handleLogout}>
                        <Animatable.View 
                        animation={"pulse"}
                        easing={'ease-in-out'}
                        className="">
                            <View className="flex-row space-x-2">
                                <AntDesign name="logout" size={24} color="red" />
                                <Text className="text-red-500">Logout</Text>
                            </View>
                            
                        
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
            
        </View>
    </SafeAreaView>
  )
}


export default Settings