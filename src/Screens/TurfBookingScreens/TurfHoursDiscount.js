import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { API_URL } from '../../Services/Api';
import CustomText from '../../Components/Texts/CustomText';

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import axios from 'axios';

const TurfHoursDiscount = () => {
    const [turfHours, setTurfHours] = useState([]);

    const fetchTurfHours = async () => {
        try {
            const response = await axios.get(`${API_URL}/discounts/discounts/60c72b2f9e5c5a3b78f5f8f9`);
            const data = response.data;

            // Format data to show hours and discount
            const formattedData = data.map(item => ({
                hours: `${item.duration / 60}HR`,
                discount: item.discountPrice,
            }));

            setTurfHours(formattedData);
        } catch (error) {
            console.log("Error fetching hours and discount", error);
        }
    };

    useEffect(() => {
        fetchTurfHours();
    }, []);

    return (
        <View style={styles.container}>
            {/* Hours Row */}
            <View style={styles.row}>
                <View style={styles.headerCell}>
                    <CustomText>HOURS</CustomText>
                </View>
                {turfHours.map((item, index) => (
                    <View key={index} style={styles.cellHighlighted}>
                        <CustomText>{item.hours}</CustomText>
                    </View>
                ))}
                <View style={styles.cell}>
                    <CustomText>Half Day</CustomText>
                </View>
            </View>

            {/* Discount Row */}
            <View style={styles.row}>
                <View style={styles.headerCell}>
                    <CustomText>DISCOUNT</CustomText>
                </View>
                {turfHours.map((item, index) => (
                    <View key={index} style={styles.cellHighlighted}>
                        <CustomText style={styles.discountText}>₹{item.discount}</CustomText>
                    </View>
                ))}
                <View style={styles.cell}>
                    <CustomText style={styles.discountText}>50</CustomText>
                </View>
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
