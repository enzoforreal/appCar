import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { StripeProvider } from '@stripe/stripe-react-native';

const Payment = () => {
  return (
   <SafeAreaView>
        <View>
            <StripeProvider
                publishableKey='pk_test_51MhsTTDhLaE5YPLlqaI6S9b8jsfQzh1uBYHoxtdkZAuFjq2ZBK3mcBpTojC8KtvKSRlSNpVmroi5Mpac05SMYUnD00CWldhOm8'
                urlScheme='https://buy.stripe.com/test_aEU5l8a1ubfl5CU6op'
                
            >

            </StripeProvider>
        </View>
   </SafeAreaView>
  )
}

export default Payment