import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../Texts/CustomText';

const CategoryCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      {/* Left Side: Image */}
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: item.url }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Right Side: Name */}
      <View style={styles.rightContainer}>
        <CustomText style={styles.text}>{item.name}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

const CategoryList = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <CategoryCard item={item} />}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp(2),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('3%'),
    marginRight: wp('3%'),
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff', // optional: make it look clean
  },
  leftContainer: {
    padding: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    paddingVertical: hp('2.2%'),
    paddingHorizontal: wp('5%'),
    justifyContent: 'center',
  },
  image: {
    width: wp(10),
    height: wp(10),
  },
  text: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
  },
});

export default CategoryList;
