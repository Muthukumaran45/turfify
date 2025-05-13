import React from "react";
import { View, FlatList } from "react-native";
import CustomText from "../Texts/CustomText";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../Constants/Colors";


const FeedbackComponent = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={{flexDirection: "row", marginVertical: hp(1) }}>
      <View style={{ width: 60, height: 60, backgroundColor: COLORS.inputGray, borderRadius: hp(50) }} />

      <View style={{ paddingLeft: 10, flexDirection: "column", flex: 1 }}>
        <View  style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <CustomText  className="font-medium text-neutral-400">
            {item.reviewerId?.username || "Anonymous"}
          </CustomText>
          <CustomText style={{marginTop: 2}}>
            {new Date(item.date).toDateString()}
          </CustomText>
        </View>
        <CustomText>{'⭐'.repeat(item.rating)}</CustomText>
        <CustomText>{item.review}</CustomText>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListEmptyComponent={
        <CustomText size={13} style={{textAlign: "center"}} className=" text-neutral-400">
          No reviews available.
        </CustomText>
      }
    />
  );
};

export default FeedbackComponent;
