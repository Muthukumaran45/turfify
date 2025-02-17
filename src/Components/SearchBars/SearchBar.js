import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Search, Filter } from "lucide-react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

const SearchBar = ({ placeholder, onFilterPress }) => {
  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <Search size={hp(2.5)} color="#000" style={styles.iconLeft} />

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder={placeholder || "Search..."}
        placeholderTextColor="#999"
      />

      {/* Filter Icon (Touchable) */}
      <TouchableOpacity onPress={onFilterPress}>
        <Filter size={hp(2.5)} color="green" style={styles.iconRight} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: hp(5),
    paddingHorizontal: wp(4),
    height: hp(6),
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconLeft: {
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    fontSize: RFValue(14),
    color: "#000",
  },
  iconRight: {
    marginLeft: wp(2),
  },
});
