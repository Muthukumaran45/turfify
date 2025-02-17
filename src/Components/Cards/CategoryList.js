import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const CategoryCard = ({ item }) => {
  const IconComponent = item.icon;
  return (
    <TouchableOpacity style={styles.card}>
      {/* Left Side (Icon with Background) */}
      <View style={[styles.leftContainer, { backgroundColor: item.leftBgColor }]}>
        <IconComponent size={wp(6)} color={item.iconColor} />
      </View>
      {/* Right Side (Text with Background) */}
      <View style={[styles.rightContainer, { backgroundColor: item.rightBgColor }]}>
        <Text style={[styles.text, { color: item.textColor }]}>{item.name}</Text>
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
        keyExtractor={(item) => item.id}
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
  },
  leftContainer: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    paddingVertical: hp('2.2%'),
    paddingHorizontal: wp('5%'),
    justifyContent: 'center',
  },
  text: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
});

export default CategoryList;
