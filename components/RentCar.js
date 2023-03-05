import { View, Text, Image, Button, ActivityIndicator, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { Feather, Ionicons } from '@expo/vector-icons';
import { auth } from './Firebase';
import firebase from "./Firebase"
import { db } from './Firebase';
import { collection, doc, setDoc, addDoc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import uuid from 'react-native-uuid';
import * as Animatable from 'react-native-animatable';





const RentCar = () => {
    const navigate = useNavigation();
    const user = auth.currentUser;
    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false,
        });

    }, []); 

    const[fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const [speed, setSpeed] = useState('')
    const [engine, setEngine] = useState('')

    const storage = getStorage();
    const starsRef = ref(storage, (`Car-Pictures/${user.uid}`));
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

    
    

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false)

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
    const uploadImage = async () => {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      })
      const metadata = {
        contentType:  "image/jpeg"

      }

      const ref = firebase.storage().ref().child(`Car-Pictures/${uuid.v4()}` + "#" + `${user.uid}`)
      const snapshot = ref.put(blob)
      snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{
          setUploading(true)
        },
        (error) => {
          setUploading(false)
          console.log(error)
          blob.close()
          return 
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then((url) => {
            setUploading(false)
            console.log("Download URL: ", url)
            setImage(url)
            blob.close()
            setDownloadURL(url)
            return url
          })
        }
        )
    }

    const create = async () => {
      await setDoc(doc(db, "Car-Details", `${uuid.v4()}` + "#" + `${user.uid}` ), {
          fullname: fullname,
          email: email,
          model: model,
          year: year,
          price: price,
          phone: phone,
          description: description,
          speed: speed,
          engine: engine,
          carImage: downloadURL,
          userId: user.uid,
      }).then(() => {
          console.log("Document successfully written!");
          navigate.navigate("Profile");
      }).catch((error) => {
          console.error("Error writing document: ", error);
      });
  }

   

  return (
    <SafeAreaView>
      <View className="flex-row mt-12 space-x-4">
        <TouchableOpacity onPress={() => navigate.navigate('Settings', {name: 'Settings'})}>
          <Animatable.View 
          animation={"pulse"}
          easing={'ease-in-out'}
          className="">
              <Ionicons name="ios-arrow-back" size={32} color="black" />
          
          </Animatable.View>
        </TouchableOpacity>
        <Text className="text-xl font-bold">Rent you car</Text>
      </View>
        <View className="mt-16 items-center justify-center border-4 border-[#80B192] rounded-full  ">
                <TouchableOpacity onPress={pickImage} className="w-20 h-20 items-center justify-center  rounded-full">
                    <Feather name="image" size={32} color="black" /> 
                </TouchableOpacity>    
                <View className="bg-[#202C69] rounded-full items-center justify-center">
                      {!uploading ? <Button title='Upload Image' color="#6A8D92" onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
                 </View> 
            
        </View>
        <View className="p-4 mt-5">
            <TextInput label="name" placeholder="Full name" value={fullname} onChangeText={(e) => setFullname(e)}   className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
        </View>
        <View className="p-4 mt-5">
            <TextInput label="name" placeholder="Email" value={email} autoCapitalize='none' keyboardType="email-address" onChangeText={(e) => setEmail(e)} className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
        </View>
        <View className="p-4 mt-5">
            <TextInput label="name" placeholder="Phone number" value={phone} keyboardType="phone-pad" onChangeText={(e) => setPhone(e)} className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
        </View>
        <View className="p-4 mt-5 flex-row">
            <TextInput label="name" placeholder="Model" value={model} onChangeText={(e) => setModel(e)} className="bg-\transparent flex-auto mr-3 w-1/2 underline-offset-1 border-b-2 border-[#D4DCF8]" />
            <TextInput label="name" placeholder="Year" value={year} keyboardType="number-pad" onChangeText={(e) => setYear(e)}  className="bg-\transparent flex-auto mr-3 w-1/2 underline-offset-1 border-b-2 border-[#D4DCF8]" />
            <TextInput label="name" placeholder="Speed" value={speed} keyboardType="number-pad" onChangeText={(e) => setSpeed(e)}  className="bg-\transparent flex-auto mr-3 w-1/2 underline-offset-1 border-b-2 border-[#D4DCF8]" />
            <TextInput label="name" placeholder="Engine" value={engine} keyboardType="number-pad" onChangeText={(e) => setEngine(e)}  className="bg-\transparent flex-auto mr-3 w-1/2 underline-offset-1 border-b-2 border-[#D4DCF8]" />
        </View>
        <View className="p-4 mt-5">
            <TextInput label="name" placeholder="Price per day" value={price} keyboardType="number-pad" onChangeText={(e) => setPrice(e)}   className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
        </View>
        <View className="p-4 mt-5">
            <TextInput label="name" placeholder="Car Description" value={description} maxLength={70} onChangeText={(e) => setDescription(e)}   className="bg-\transparent flex-auto mr-3 underline-offset-1 border-b-2 border-[#D4DCF8]" />
        </View>
        <View className="mt-5 w-full items-center justify-center">
            <Button title="Rent" onPress={create} color="#6A8D92"/>
        </View>
    </SafeAreaView>
  )
}

export default RentCar