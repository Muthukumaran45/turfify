import React from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HorizontalImageList = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity activeOpacity={0.8}>
            <Image 
              source={{ uri: item.image }} 
              style={[
                styles.image, 
                index === 0 ? { marginLeft: hp(2) } : null, // First item marginLeft
                index === data.length - 1 ? { marginRight: hp(1.5) } : null // Last item marginRight
              ]} 
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(2),
  },
  image: {
    width: wp(80),
    height: hp(20),
    borderRadius: 10,
    marginLeft: hp(1), 
  },
});

export default HorizontalImageList;
