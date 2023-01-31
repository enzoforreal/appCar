import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import {signUp }from '../assets'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const SignUp = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, []);
  return (
    <SafeAreaView className="flex-1 relative ">
        <View className="space-y-24">
            <View className="flex items-center mt-20">
                    <Image source={signUp} className="  h-56 w-5/6"></Image>
            </View>

            <View className="">
            <Text className="text-3xl p-4 text-[#1B065E]" >Sign up</Text>
            </View>
        </View>
        <View  className=" flex-column items-center justify-center  p-4 space-y-6">
            <KeyboardAvoidingView className=" flex-column items-center justify-center mt-8 p-4 space-y-6" behavior="padding" >
                <View className="flex-row space-x-3">
                    <Entypo name="email" size={24} color="black" className=""  />
                    <TextInput label="name" placeholder="E-mail" inputMode="email" keyboardType="email-address" className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-4 border-rose-500" />
                </View>
                <View className="flex-row space-x-3">
                    <MaterialIcons name="drive-file-rename-outline" size={24} color="black" />
                    <TextInput label="name" placeholder="Full name" className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-4 border-rose-500" />
                </View>
                <View className="flex-row space-x-3">
                    <MaterialIcons name="lock" size={24} color="black" />
                    <TextInput label="name" placeholder="Password" className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-4 border-rose-500" />
                </View>
                <View className="flex-row space-x-3">
                    <AntDesign name="phone" size={24} color="black" />
                    <TextInput label="name" placeholder="Mobile" keyboardType="phone-pad" className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-4 border-rose-500" />
                    
                </View>
           
            </KeyboardAvoidingView>
            
            
           
             
             

        </View>

    </SafeAreaView>
  )
}

export default SignUp