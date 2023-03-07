import { View, Text, Dimensions, SafeAreaView, ScrollView, Image, TouchableOpacity, Button, ToastAndroid } from 'react-native'
import React, {useState, useEffect, useLayoutEffect,} from 'react'
import { useNavigation } from '@react-navigation/native'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {collection, Firestore, getDoc, getDocs, onSnapshot, query, doc, deleteDoc, where} from "firebase/firestore";
import { db } from './Firebase';
import { auth } from './Firebase';


const BookingMap = ({route}) => {

    const navigate = useNavigation();
    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false,
        });

    })


    


    const user = auth.currentUser;

    const {mapId} = route.params;

    const [mapData, setMapData] = useState([]);

    const fetchBookings =  () => {
        let unsubscribe = false
        getDocs(collection(db, "Bookings", `${user.uid}`, "CarBookings")).then((querySnapshot) => {
          if (unsubscribe) return
          const newUserDataArray = querySnapshot.docs
          .map((doc) => ({id: doc.id, ...doc.data()}))
          
    
          setMapData(newUserDataArray)
    
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

    const check  = mapData.filter((item) => item.bookingCarLocation === mapId)



  return (
    <SafeAreaView>
        
    </SafeAreaView>
  )
}

export default BookingMap