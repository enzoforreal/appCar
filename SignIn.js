import { View, Text, Image, SafeAreaView, TouchableOpacity, } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';

const SignIn = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, []);
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  )
}

export default SignIn