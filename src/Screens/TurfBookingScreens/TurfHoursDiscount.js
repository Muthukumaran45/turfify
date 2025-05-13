import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { API_URL } from '../../Services/Api';
import CustomText from '../../Components/Texts/CustomText';

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// zustand
import useTurfDetails from "../../Zustand/useTurfDetails";

const TurfHoursDiscount = () => {
    const turfData = useTurfDetails((state) => state.turfDetails);

    return (
        <View style={styles.container}>
            {/* Hours Row */}
            <View style={styles.row}>
                <View style={styles.headerCell}>
                    <CustomText>HOURS</CustomText>
                </View>
                {turfData?.discount?.map((item, index) => (
                    <View key={index} style={styles.cellHighlighted}>
                        <CustomText>{item.duration / 60} hr</CustomText>
                    </View>
                ))}
            </View>

            {/* Discount Row */}
            <View style={styles.row}>
                <View style={styles.headerCell}>
                    <CustomText>DISCOUNT</CustomText>
                </View>
                {turfData?.discount?.map((item, index) => (
                    <View key={index} style={styles.cellHighlighted}>
                        <CustomText style={styles.discountText}>₹{item.discountPrice}</CustomText>
                    </View>
                ))}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: hp(1.5),
        marginTop: hp(2),
        backgroundColor: "#fff",
        borderRadius: hp(1),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerCell: {
        width: 80,
        justifyContent: 'center',
    },
    cell: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellHighlighted: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3F2FD', // Light blue background for hours and discount cells
        paddingVertical: hp(1),
    },
    discountText: {
        fontSize: 14,
    },
});

export default TurfHoursDiscount;
