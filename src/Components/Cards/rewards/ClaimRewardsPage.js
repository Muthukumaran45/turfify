import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

// components
import Header from '../../Headers/Header';

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomText from '../../Texts/CustomText';
import { COLORS } from '../../../Constants/Colors';


const ClaimRewardsPage = ({ route }) => {
    const { rewardsData } = route.params || { rewardsData: [] };

    const completedRewards = rewardsData.filter(item => item.status === 'completed');
    // console.log("completed =", completedRewards)

    return (
        <ScrollView >
            {/* Header */}
            <View style={{ marginHorizontal: hp(2) }}>
                <Header title="Your Rewards" />
            </View>

            <View style={{ paddingHorizontal: hp(2) }}>
                {completedRewards.length === 0 ? (
                    <Text style={styles.emptyText}>No completed rewards yet.</Text>
                ) : (
                    completedRewards.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <CustomText style={styles.title}>{item.title}</CustomText>
                            {/* <CustomText style={styles.reward}> {item.reward}</CustomText> */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: hp(2) }}>
                                {/* <CustomText style={{fontSize: hp(2.3)}}>Milestone: {item.bookingsRequired}</CustomText> */}
                                <CustomText style={{ fontSize: hp(2) }}>Bookings: {item.currentBookings} 🎁</CustomText>

                                <TouchableOpacity style={styles.claimbtn}>
                                    <CustomText style={{ color: "#fff", fontSize: hp(2.3) }}>Claim</CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </View>

        </ScrollView>
    );
};

export default ClaimRewardsPage;

const styles = StyleSheet.create({

    card: {
        borderRadius: 10,
        marginBottom: hp(2),
        backgroundColor: '#fff',
        elevation: 3,
        paddingBottom: hp(2),
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    title: {
        fontSize: hp(2.5),
        fontWeight: 'bold',
        marginTop: hp(1),
        paddingHorizontal: hp(2)
    },
    reward: {
        fontSize: hp(2),
        color: 'green',
        marginVertical: 4,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
        marginTop: 40,
    }, claimbtn: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: hp(5),
        paddingVertical: hp(1),
        borderRadius: hp(1),

    }
});
