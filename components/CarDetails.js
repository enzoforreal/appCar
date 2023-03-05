import React, {useState, useEffect, useLayoutEffect, useRef} from 'react'
import { View, Text, Image, Dimensions,  TouchableOpacity, Button, ToastAndroid, TextInput, TouchableHighlight } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import {storage} from "./Firebase"
import {collection, doc, getDoc, getDocs, onSnapshot, query, setDoc} from "firebase/firestore";
import { db } from './Firebase';
import { Feather, Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { CartProvider, useCart } from "react-use-cart";
import { auth } from './Firebase';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';




const CarDetails = ({route, navigation}) => {
  const navigate = useNavigation();
    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false,
        });

    }, []);

    const { addItem } = useCart();
    const user = auth.currentUser;

    const [carImage, setCarImage] = useState("")
    const [userId , setUserId] = useState("")



    const {itemId} = route.params;


    const [Posts, setPosts] = useState([]);
    const width = Dimensions.get('window').width;

    const showToast = () => {
      ToastAndroid.show("You have successfully booked this car", ToastAndroid.SHORT);
      navigate.navigate("Profile" , {name: 'Profile'})
    }

    


  

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

  const check = Posts.filter((item) => item.carImage === itemId)

  const create = async () => {
    await setDoc(doc(db, "Bookings", `${uuid.v4()}` + "#" + `${user.uid}`), {
      carImage: carImage,
      userId: user.uid,
    }).then(() => {
      console.log("Document successfully written!");
      navigate.navigate("Profile");
  }).catch((error) => {
      console.error("Error writing document: ", error);
  });
    
  }



  console.log(check)





  return (

    <SafeAreaView>
      <View className="">
      <View className="flex-row mt-6 space-x-12">
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
        {check.map((item, index) => (
          <SafeAreaView className="">
             <View className="justify-content items-center pt-2 " style={{width: width}}>
              <Image key={index} source={{uri: item.carImage}} style={{elevation:0}}  className="w-5/6 h-64 rounded-lg" />
            </View>
            <View className="p-4 space-y-4">
              <Text className="text-xl text-center  mt-3">{item.model}</Text>
              <Text className="text-sm text-[#757e89]  mt-2 w-3/4" >{item.description}</Text>  
            </View>
            <View className="bg-[#e7e7db] shadow-2xl space-y-4  h-full p-4  rounded-t-3xl" >
              <Text>Renter</Text>
              <View className="flex-row justify-between">
               <Text className="">{item.fullname}</Text>
               <View className="flex-row space-x-2">
                <Entypo name="phone" size={24} color="black" />
                  <Text className="">{item.phone}</Text>
               </View>
              </View>
              <View className="flex-row space-x-4">
                  <View className="bg-[#a5d3de] w-28 h-36 rounded-3xl">
                    <Text className="text-[#ffffff] text-center mt-4">Speed</Text>
                    <View className="flex-row p-4 space-x-2">
                      <Ionicons name="speedometer" size={24} color="black"  className="p-4" />
                      <Text className="text-[#ffffff] text-center text-2xl font-Poppins ">{item.speed}</Text>
                    </View>

                  </View>
                  <View className="bg-[#272727] w-32 h-36 rounded-3xl">
                    <Text className="text-[#ffffff] text-center mt-4">Engine Output</Text>
                    <View className="flex-row p-4 space-x-2">
                      <MaterialCommunityIcons name="engine" size={24} color="white" />
                      <Text className="text-[#ffffff] text-center text-xl font-Poppins ">{item.engine}</Text>
                      <Text className="text-[#ffffff] text-center font-Poppins ">/hp</Text>
                    </View>

                  </View>
                  <View className="bg-[#f6d28f] w-28 h-36 rounded-3xl">
                    <Text className="text-[#ffffff] text-center mt-4">Year</Text>
                    <View className="flex-row p-4 space-x-2">
                      <FontAwesome name="sort-numeric-asc" size={24} color="black" />
                      <Text className="text-[#ffffff] text-center text-2xl font-Poppins ">{item.year}</Text>
                    </View>

                  </View>
                 
               </View>
               <View className="flex-row justify-between shadow-2xl rounded-xl bg-white h-full w-full" >
                <View className="flex-row">
                  <Text className="text-center text-2xl font-Poppins pl-4 mt-4">${item.price}</Text>
                  <Text className="text-center  font-Poppins mt-6">/day</Text>
                </View>
                <View className="p-2" >

                      <View className="w-28 h-12 rounded-3xl mt-2 ml-4">
                        <Button title="Book a car" color="#a5d3de" onPress={() => {

                          const creat2 = async () => {

                            await setDoc(doc(db, "Bookings", `${uuid.v4()}` + "#" + `${user.uid}`), {
                              bookingCarImage: item.carImage,
                              bookingUserId: user.uid,
                            }).then(() => {
                             
                              console.log("Document successfully written!");
                             
                          }).catch((error) => {
                              console.error("Error writing document: ", error);
                          });
                            
                          };
                          creat2();
                          navigate.navigate("Bookings", {itemId2: item.carImage});
                          setCarImage(item.carImage);
                          setUserId(user.uid);
                          

                          

                        }} />
                      </View>

                    {/* <TouchableHighlight onPress={showToast}>
                      <View className="bg-[#a5d3de] w-28 h-12 rounded-3xl mt-2 ml-4">
                          <Text className="text-[#ffffff] text-center mt-2">Book a car</Text>
                      </View>
                    </TouchableHighlight> */}
                    
                 
                </View>
                

              </View>
              

            </View>
          </SafeAreaView>
         
          
          
        ))}
      </View>

    </SafeAreaView>
   
  )
}

export default CarDetails