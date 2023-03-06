import { View, Text, Dimensions, SafeAreaView, ScrollView, Image, TouchableOpacity, Button, ToastAndroid } from 'react-native'
import React, {useState, useEffect, useLayoutEffect,} from 'react'
import { useNavigation } from '@react-navigation/native'
import {collection, Firestore, getDoc, getDocs, onSnapshot, query, doc, deleteDoc, where} from "firebase/firestore";
import { db } from './Firebase';
import { auth } from './Firebase';
import firebase from './Firebase';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';







const Bookings = ({route}) => {
    const navigate = useNavigation();
    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false,
        });

    }, [])   

    const user = auth.currentUser;

    const showToast = () => {
      
    }







    const {itemId2} = route.params;

    const [Posts, setPosts] = useState([]);
    const [Bookings, setBookings] = useState([]);
    const [docId, setDocId] = useState([]);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;


    const fetchImages =  () => {
        let unsubscribe = false
        getDocs(collection(db, "Car-Details")).then((querySnapshot) => {
          if (unsubscribe) return
          const newUserDataArray = querySnapshot.docs
          .map((doc) => (doc.data()))
    
          setPosts(newUserDataArray)
    
    
          
           
        })
        .catch((error) => {
          if (unsubscribe) return
          console.log("Error getting documents: ", error);
        })
        
        return () => (unsubscribe = true)
      }
    
    
      useEffect(() => {
        fetchImages()
      }, [])

        const fetchBookings =  () => {
        let unsubscribe = false
        getDocs(collection(db, "Bookings", `${user.uid}`, "CarBookings")).then((querySnapshot) => {
          if (unsubscribe) return
          const newUserDataArray = querySnapshot.docs
          .map((doc) => ({id: doc.id, ...doc.data()}))
          
    
          setBookings(newUserDataArray)
    
        })
        .catch((error) => {
            if (unsubscribe) return
            console.log("Error getting documents: ", error);
        })
        return () => (unsubscribe = true)
    }


    useEffect(() => {
        fetchBookings()
    }, [])

    



    
    


    

    

    const carPrice = Bookings.filter((item) => item.bookingCarPrice)

    for (var sum = 0 , i = 0; i < carPrice.length; i++) {
        sum += Number(carPrice[i].bookingCarPrice);
        console.log(sum)
    }


    const origin = {latitude: 37.3318456, longitude: -122.0296002};
    const destination = {latitude: 37.771707, longitude: -122.4053769};
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAGL2KalRkDXHq7bcQDjkWzhbOBpLB488I';

    


    

    

    

    console.log(Bookings)
   


 
      

  return (
    <SafeAreaView className="">
        <View className="flex-row mt-10 space-x-12">
          <TouchableOpacity onPress={() => navigate.navigate('Profile', {name: 'Profile'})}>
            <Animatable.View 
            animation={"pulse"}
            easing={'ease-in-out'}
            className="">
                <Ionicons name="ios-arrow-back" size={32} color="black" />
            
            </Animatable.View>
          </TouchableOpacity>
          <Text className="text-xl font-bold">Car Details</Text>
        </View>

        <View className="mt-10 p-2 pb-24 " style={{height: height, flex: 0}}>
                <ScrollView className="space-y-5">
                { Bookings.map((item) => (
                <SafeAreaView>

                       <View className="bg-[#e7e7e7]">
                            <View className=" justify-center mt-6 flex-row  ">
                               <Image source={{uri: item.bookingCarImage}} className="h-60 w-[70%] rounded-3xl " />

                            </View>
                            <View className="mt-4 p-4 space-y-2">
                                <View className="flex-row justify-between">
                                  <Text className="text-2xl font-bold mt-6">{item.bookingCarModel}</Text>
                                 <TouchableOpacity onPress={() => deleteDoc(doc(db, "Bookings", `${user.uid}`, "CarBookings", `${item.id}`))}>
                                    <EvilIcons name="trash" size={32} color="red" />
                                  
                                 </TouchableOpacity>
                                </View>
                                
                                <View className="space-y-2">
                                  <View className="flex-row space-x-3">
                                    <Feather name="map-pin" size={20} color="black" />
                                    <Text className="text-gray-500">{item.bookingCarLocation}</Text>
                                  </View>
                                  <View className="flex-row justify-between">
                                    <View className="flex-row space-x-3">
                                      <Ionicons name="person-outline" size={20} color="black" />
                                      <Text className="text-gray-500">{item.bookingCarRenterName}</Text>
                                    </View>
                                    <View className="flex-row space-x-3">
                                      <Feather name="phone" size={24} color="black" />
                                      <Text className="text-gray-500">{item.bookingCarRenterPhone}</Text>
                                    </View>
                                  </View>
                                  
                                </View>
                                
                            </View>                       
                        </View>
                </SafeAreaView>
                ))}
                </ScrollView>
                <View className="rounded-xl p-2 mt-3 flex-row justify-between bg-[#fbdcdc]">
                  <View>
                    <Text className=" text-gray-500 ">Total Price</Text>
                    <View className="flex-row">
                      <Text className="text-2xl mt-1">${sum}</Text>
                      <Text className="text-gray-500 mt-1">/day</Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => navigate.navigate('Payment', {name: 'Payment'})}>
                      <View className="bg-[#fbbf24] rounded-xl p-2 pl-7 pr-7 mt-3">
                        <Text className="text-center text-white">Pay Now</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                    
                </View>
                
        </View>
    </SafeAreaView>
  )
}

export default Bookings