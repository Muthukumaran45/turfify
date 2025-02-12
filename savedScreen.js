import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage as rf } from 'react-native-responsive-fontsize';

const CardItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress?.(item)}>
    <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
    <View style={styles.info}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.rating}>⭐ {item.rating}</Text>
    </View>
  </TouchableOpacity>
);

const HorizontalCardList = ({ data, onPressItem }) => (
  <FlatList
    data={data}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <CardItem item={item} onPress={onPressItem} />}
    contentContainerStyle={styles.container}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hp(2),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    marginRight: wp('3%'),
    width: wp('40%'),
    height: hp('26%'),
    elevation: 3,
    overflow: 'hidden',
    marginVertical: hp(1.5),
  },
  image: {
    width: '100%',
    height: hp('14%'),
  },
  info: {
    height: hp('13%'),
    padding: wp('2%'),
  },
  title: {
    fontSize: rf(2.2),
    fontWeight: 'bold',
  },
  location: {
    fontSize: rf(1.8),
    color: 'gray',
  },
  price: {
    fontSize: rf(2),
    fontWeight: 'bold',
    color: 'green',
  },
  rating: {
    fontSize: rf(2),
    color: 'orange',
  },
});

export default HorizontalCardList;
