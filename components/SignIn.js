import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Button } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import {signIn }from '../assets'
import { Entypo,  MaterialIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './Firebase';


const SignIn = () => {
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
    
    
        const onLogin = async (e) => {
          e.preventDefault()
         
          await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate.navigate("Profile")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn(errorMessage);
                // ..
            });
     
       
        }

  return (
    <SafeAreaView className="flex-1 relative ">
        <View className="space-y-24">
            <View className="flex items-center mt-20">
                    <Image source={signIn} className="  h-[320px] w-5/6"></Image>
            </View>

            <View className="">
            <Text className="text-3xl p-4 text-[#1B065E]" >Login</Text>
            </View>
        </View>
            <KeyboardAvoidingView className=" flex-column items-center justify-center mt-6 p-3 space-y-6" behavior="padding" >
                <View className="flex-row space-x-3">
                    <Entypo name="email" size={24} color="black" className=""  />
                    <TextInput label="name" placeholder="E-mail" inputMode="email" keyboardType="email-address" value={email} onChangeText={(e)=>setEmail(e)} className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
                </View>
                <View className="flex-row space-x-3">
                    <MaterialIcons name="lock" size={24} color="black" />
                    <TextInput label="name" placeholder="Password" secureTextEntry value={password} onChangeText={(e)=>setPassword(e)} className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
                </View>
           
            </KeyboardAvoidingView>
            <View className="flex  m-7 bg-[#202C69]  h-16  mt-7 items-center justify-center rounded-full">
                {/* <TouchableOpacity onPress={() => navigation.navigate('SignUp', {name: 'SignUp'})}>
                    <Animatable.View 
                    animation={"pulse"}
                    easing={'ease-in-out'}
                    className="">
                            <Text className="text-white ">Login</Text>
                    </Animatable.View>
                </TouchableOpacity>  */}
                <Button 
                    onPress={onLogin}
                    className="text-black "
                    title="Login"
                    fullWidth
                    ripple={true}
                    color="#202C69"
                    style={{width: "50%"}}

                />
            </View>
            <View className="flex-row ml-1/2  items-center justify-center space-x-1">
                <Text className="text-[#1e1f2f]">New to GO?</Text>
                <TouchableOpacity onPress={() => navigate.navigate('SignUp', {name: 'SignUp'})}>
                    <Animatable.View 
                    animation={"pulse"}
                    easing={'ease-in-out'}
                    className="flex-row ml-1/2  items-center justify-center">
                            <Text className="text-[#4A99E5]">Sign Up</Text>
                    </Animatable.View>
                </TouchableOpacity> 
            </View>


    </SafeAreaView>
  )
}


export default SignIn