import { View, Text, Dimensions, SafeAreaView, ScrollView, Image } from 'react-native'
import React, {useState, useEffect, useLayoutEffect,} from 'react'
import { useNavigation } from '@react-navigation/native'
import {collection, Firestore, getDoc, getDocs, onSnapshot, query} from "firebase/firestore";
import { db } from './Firebase';
import { CartProvider, useCart } from "react-use-cart";




const Bookings = ({route}) => {
    const navigate = useNavigation();
    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false,
        });

    }, [])   



    const {itemId2} = route.params;

    const [Posts, setPosts] = useState([]);
    const [Bookings, setBookings] = useState([]);
    const width = Dimensions.get('window').width;

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
        getDocs(collection(db, "Bookings")).then((querySnapshot) => {
          if (unsubscribe) return
          const newUserDataArray = querySnapshot.docs
          .map((doc) => (doc.data()))
    
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


    const check = Posts.filter((item) => item.carImage === itemId2)
    console.log(check)
    


   


 
      

  return (
    <SafeAreaView>
        <View>
          
            {check.map((item, index) => (
                <SafeAreaView>
                    <ScrollView className="mt-10 pt-8 pl-4 pr-4">
                        <View className=" ">
                            <View className="bg-[#d7d7d7] rounded-3xl h-52">
                               
                                <Image source={{uri: item.carImage}} style={{overflow: 'hidden'}} className="w-2/5 h-52 rounded-lg "/>
                                <Text>{item.model}</Text>
                                <Text>{item.price}</Text>
                            </View>
                           
                            
                        </View>
                    </ScrollView>
                </SafeAreaView>
            ))}
        </View>
    </SafeAreaView>
  )
}

export default Bookings