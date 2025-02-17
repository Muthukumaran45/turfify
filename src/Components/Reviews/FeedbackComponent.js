import React from "react";
import { View, FlatList } from "react-native";
import CustomText from "../Texts/CustomText";

const FeedbackComponent = ({ data }) => {
  const renderItem = ({ item }) => (
    <View className="flex-row my-4">
      <View className="bg-neutral-300 rounded-lg" style={{ width: 60, height: 60 }} />

      <View className="flex-col flex-1" style={{ paddingLeft: 10 }}>
        <View className="flex-row items-center justify-between">
          <CustomText  className="font-medium text-neutral-400">
            {item.reviewerId?.username || "Anonymous"}
          </CustomText>
          <CustomText className="mt-1" size={13} >
            {new Date(item.date).toDateString()}
          </CustomText>
        </View>
        <CustomText>{'⭐'.repeat(item.rating)}</CustomText>
        <CustomText size={13}>{item.review}</CustomText>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListEmptyComponent={
        <CustomText size={13} className="text-center text-neutral-400">
          No reviews available.
        </CustomText>
      }
    />
  );
};

export default FeedbackComponent;
