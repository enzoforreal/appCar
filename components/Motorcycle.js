import { View, Text, Button, Dimensions,  TouchableOpacity,  Image, ActivityIndicator, ScrollView, RefreshControl, FlatList } from 'react-native'
import React, { useState, useEffect, useLayoutEffect, } from 'react';
import { useNavigation } from '@react-navigation/native'
import { signOut } from "firebase/auth";
import { auth } from './Firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { avatar } from '../assets/index';
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import {storage} from "./Firebase"
import {collection, getDoc, getDocs, onSnapshot, query} from "firebase/firestore";
import { db } from './Firebase';
import MapView from 'react-native-maps';
import 'firebase/compat/firestore';









const Motorcycle = () => {
  const user = auth.currentUser;
  const navigate = useNavigation();
    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false,
        });

    }, []);

    //Download profile image
    //const storage = getStorage();
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

  


const [Posts, setPosts] = useState([]);

  

  const fetchImages =  () => {
    let unsubscribe = false
    getDocs(collection(db, "Motorcycle-Details")).then((querySnapshot) => {
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

  


  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

 
 

  return (
    <SafeAreaView>
      <View className="flex-row p-4 justify-between">
        <View className="space-y-1 ">
          <Text className="text-base text-[#696969]">Location</Text>
          <Text className="font-bold text-lg text-[#2A2A2A]">Polynesia, Oceania</Text>
        </View>
        <View className="flex-row space-x-5">
          <TouchableOpacity>
            <Animatable.View 
              animation={"pulse"}
              easing={'ease-in-out'}
              className=" w-11 rounded-full items-center justify-center h-11 ">
                <Feather name="bell" size={24} color="black"  />
              
            </Animatable.View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigate.navigate('MotorcycleSettings', {name: 'MotorcycleSettings'})}>
            <Animatable.View 
              animation={"pulse"}
              easing={'ease-in-out'}
              className="bg-[#d7d7d7] w-11 rounded-full items-center justify-center h-11 ">
                {downloadURL && <Image source={{uri: downloadURL}} className="w-11 h-11 rounded-full"/>}
              
            </Animatable.View>
          </TouchableOpacity>
          
        </View>
      </View>

      <View className="pl-4 mt-4">
        <TouchableOpacity onPress={() => navigate.navigate("Profile", {name: "Profile"})}>
          <Text className="text-base">Do you want to see cars?</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-10 p-2 pb-48 " style={{height: height, flex: 0}}>

        
        <ScrollView className="space-y-5 "
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }

            
        >
            {Posts.map((item, index) => (
              <TouchableOpacity onPress={() => navigate.navigate("MotorcycleDetails", {name: "MotorcycleDetails", itemId: item.carImage})}>
                <View className="space-y-5 bg-[#e7e7e7] justify-between flex-row h-52 items-center  rounded-xl">
                  <Image source={{uri: item.carImage}} style={{overflow: 'hidden'}} className="w-2/5 h-52 rounded-lg "/>
                  <View className="flex  space-y-10  items-end justify-between   ">
                    <Text className="text-lg  text-[#2A2A2A]">{item.model}</Text>
                    <View className="flex-row justify-between  space-x-10 ">
                        <View>
                          <Text className="text-lg  text-[#2A2A2A]">Year: {item.year}</Text>
                        </View>
                        
                        <View className="bg-[#D0D6B5] rounded-3xl w-16  items-center">
                          <Text className="text-base  text-[#2A2A2A]">${item.price}</Text>
                        </View>
                    </View>
                   
                   
                  </View>
                  
                </View>
                
              </TouchableOpacity>
            )
            )}
           
            
        </ScrollView>

      </View>

     
          
  
    </SafeAreaView>
  )
}

export default Motorcycle