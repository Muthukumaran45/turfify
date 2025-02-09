import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// components
import CardList from '../Components/Cards/CardList';




// vertical card list data
const CardListData = [
  {
    id: '1',
    title: 'Strikers Academy',
    location: 'Purasaiwakkam, Chennai',
    price: '800/hr',
    rating: '4.8',
    discount: '₹150 OFF',
    image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg'
  },
  {
    id: '2',
    title: 'Strikers Academy',
    location: 'Purasaiwakkam, Chennai',
    price: '800/hr',
    rating: '4.8',
    discount: '₹100 OFF',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg'
  },
];



const BookingScreen = () => {
  const handlePress = (item) => console.log('Clicked:', item);

  return (
    <ScrollView>
      <CardList data={CardListData} />

      <View style={{marginBottom: hp(15)}} />

    </ScrollView>

  )
}

export default BookingScreen

const styles = StyleSheet.create({})