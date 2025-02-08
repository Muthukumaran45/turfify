import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// packages


// component
import CustomText from '../Components/Texts/CustomText'
import CustomButton from '../Components/Buttons/CustomButton'
import CustomInput from '../Components/Inputs/CustomInput'

// icons
import { Phone, Lock, User } from "lucide-react-native";

const HomeScreen = () => {
  return (
    <View className='m-4'>
      <CustomText className="">Hello</CustomText>
      <CustomButton title="Click Me" onPress={() => console.log("Button Pressed")} />
      <CustomButton title="Disabled" disabled={true} />

      <CustomInput placeholder="Enter your name" className='my-2' leftIcon={<User size={22} />} />

      <CustomInput
        isPhoneNumber
        keyboardType="phone-pad"
        placeholder="Enter phone number"
        className='my-2'
      />

      <CustomInput
        placeholder="Enter password"
        secureTextEntry
        leftIcon={<Lock size={22} />}
        className='my-2'
      />

      <CustomInput
        placeholder="Enter email"
        rightIcon={<Phone size={22} />}
        onRightPress={() => alert("Phone icon pressed")}
        className='my-2'
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

})