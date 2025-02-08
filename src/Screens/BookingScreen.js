import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// components
import FadeImageSlider from '../Components/Sliders/FadeImageSlider'
import HorizontalCardList from '../Components/Cards/HorizontalCardList';
import CardList from '../Components/Cards/CardList';


// data for fadeIn slides
const slides = [
  { id: "1", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" },
  { id: "2", image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg" },
  { id: "3", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg" },
  { id: "4", image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg" },
];

// data for small cards
const data = [
  { id: '1', title: 'Game On 2.0', location: 'Thoraipakkam, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg' },
  { id: '2', title: 'Spark Academy', location: 'Sholinganallur, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg' },
  { id: '3', title: 'Beyond Arena', location: 'Velachery, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg' },
  { id: '4', title: 'Elite Sports', location: 'Anna Nagar, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg' },
  { id: '5', title: 'Urban Turf', location: 'OMR, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg' },
];


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

      <FadeImageSlider slides={slides} interval={3000} fadeDuration={500} />

      <HorizontalCardList data={data} onPressItem={handlePress} />

      <CardList data={CardListData} />

      <View style={{marginBottom: hp(15)}} />

    </ScrollView>

  )
}

export default BookingScreen

const styles = StyleSheet.create({})