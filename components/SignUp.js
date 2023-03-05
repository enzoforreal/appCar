import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Button, Platform } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import {signUp }from '../assets'
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import {  createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { auth } from './Firebase';

const SignUp = () => {
    const navigate = useNavigation();
    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false,
        });

    }, []);



    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    const register = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password) 
      .then((auth) => {
          updateProfile(auth.user, {
            displayName: displayName,
            phoneNumber: phoneNumber,
          })
      })
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate.navigate("Profile");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding"  >
    <SafeAreaView className="flex-1 relative ">
        <View className="space-y-12">
            <View className="flex items-center mt-20">
                    <Image source={signUp} className="  h-56 w-5/6"></Image>
            </View>

            <View className="">
            <Text className="text-3xl p-4 text-[#1B065E]" >Sign up</Text>
            </View>
        </View>
        
            <View className=" flex-column items-center justify-center mt-2 p-3 space-y-6" behavior="padding" >
                <View className="flex-row space-x-3">
                    <Entypo name="email" size={24} color="black" className=""  />
                    <TextInput label="email" placeholder="E-mail" inputMode="email" keyboardType="email-address" value={email} onChangeText={(e) => setEmail(e)} className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
                </View>
                <View className="flex-row space-x-3">
                    <MaterialIcons name="drive-file-rename-outline" size={24} color="black" />
                    <TextInput label="name" placeholder="Full name" value={displayName} onChangeText={(e) => setDisplayName(e)}  className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
                </View>
                <View className="flex-row space-x-3">
                    <MaterialIcons name="lock" size={24} color="black" />
                    <TextInput label="password" placeholder="Password" secureTextEntry value={password} onChangeText={(e) => setPassword(e)}  className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
                </View>
                <View className="flex-row space-x-3">
                    <AntDesign name="phone" size={24} color="black" />
                    <TextInput label="name" placeholder="Mobile" keyboardType="phone-pad" value={phoneNumber} onChangeText={(e) => setPhoneNumber(e)}  className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
                </View>
           
            </View>
            <View className="flex  bg-[#202C69] m-7  h-16  mt-7 items-center justify-center rounded-full">
                <Button 
                    onPress={register}
                    className="text-black "
                    title="Create"
                    fullWidth
                    ripple={true}
                    color="#202C69"
                    style={{width: "50%"}}

                />
                {/* <TouchableOpacity onPress={register}>
                    <Animatable.View 
                    animation={"pulse"}
                    easing={'ease-in-out'}
                    className="">
                            <Text className="text-white ">Create</Text>
                    </Animatable.View>
                </TouchableOpacity>  */}
            </View>
            <View className="flex-row ml-1/2   items-center justify-center space-x-1">
                <Text className="text-[#1e1f2f]">Already have an account?</Text>
                <TouchableOpacity onPress={() => navigate.navigate('SignIn', {name: 'SignIn'})}>
                    <Animatable.View 
                    animation={"pulse"}
                    easing={'ease-in-out'}
                    className="flex-row ml-1/2  items-center justify-center">
                            <Text className="text-[#4A99E5]">Sign In</Text>
                    </Animatable.View>
                </TouchableOpacity> 
            </View>


    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default SignUp