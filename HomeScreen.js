import { View, Text, Image, SafeAreaView, TouchableOpacity, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import { HomeCar } from '../assets';



const HomeScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, []);
    
  return (
    <SafeAreaView className="flex-1 relative " >
        <View className="flex-1 relative ">
            <Image className=" w-full h-full object-cover" source={HomeCar}/>
            <View className="absolute mt-16 px-7 flex-row space-x-3">
                <View className="bg-white h-16 w-16 rounded-full items-center justify-center ">
                    <Text className=" text-[#16E0BD] text-2xl">GO</Text>
                </View>
                <Text className="text-[#141115] text-2xl mt-3">Rental</Text>
            </View>
            <View className="absolute mt-[190px] items-center justify-center px-7">
                <Text className="text-[38px] text-[#E1F4CB]">Find the ideal sport car for you.</Text>
            </View>
            <View className="flex  ml-1/2 bottom-[200px] items-center justify-center">
                <Text className="text-white">Get a great car at a great price</Text>
            </View>
            <View className="flex ml-1/2 bg-[#202C69] w-0.7  h-16 bottom-[170px] items-center justify-center rounded-full">
                <TouchableOpacity onPress={() => navigation.navigate('SignUp', {name: 'SignUp'})}>
                    <Animatable.View 
                    animation={"pulse"}
                    easing={'ease-in-out'}
                    className="">
                            <Text className="text-white ">Get Started</Text>
                    </Animatable.View>
                </TouchableOpacity> 
            </View>
            
            <View className="flex-row ml-1/2 bottom-[150px] items-center justify-center space-x-1">
                <Text className="text-white">Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn', {name: 'SignIn'})}>
                    <Animatable.View 
                    animation={"pulse"}
                    easing={'ease-in-out'}
                    className="flex-row ml-1/2  items-center justify-center">
                            <Text className="text-[#E1F4CB]">Sign In</Text>
                    </Animatable.View>
                </TouchableOpacity> 
            </View>
                

             
        </View>
        
    </SafeAreaView>
    
    
  )
}

export default HomeScreen