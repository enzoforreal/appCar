import { View, Text, Image, Button, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import firebase from "./Firebase"
import uuid from 'react-native-uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from './Firebase';
import { avatar } from '../assets/index';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const EditProfile = () => {
    const navigate = useNavigation();
    const user = auth.currentUser;
    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false,
        });

    }, []); 
    //Edit Profile Inmage
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
      const ref = firebase.storage().ref().child(`Profile-Pictures/${user.uid}`)
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
            return url
          })
        }
        )
    }
    const storage = getStorage();
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



  return (
    <SafeAreaView>
        <View className="p-16 items-center justify-center">
            <TouchableOpacity onPress={pickImage} className="w-20 h-20  rounded-full">
                {downloadURL && <Image source={{uri: downloadURL}} className="w-20 h-20 rounded-full"/>}
            </TouchableOpacity>
            
            <View className="bg-[#202C69] rounded-full items-center justify-center">
                      {!uploading ? <Button title='Upload Image' color="#202C69"   onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
            </View>
        </View>
    </SafeAreaView>
  )
}

export default EditProfile