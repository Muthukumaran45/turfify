import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { X } from 'lucide-react-native';
import CustomText from "../../../Components/Texts/CustomText";
import { Nunito_Bold } from "../../../Constants/FontFamily";

const PriceModal = ({ visible, onClose, priceData }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <CustomText size={2.2} fontFamily={Nunito_Bold}>Price details</CustomText>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={hp(3)} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={Object.values(priceData)}
                        keyExtractor={(item) => item.title}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <CustomText style={{ textAlign: "center", fontWeight: "700" }}>{item.title}</CustomText>
                                </View>
                                {item.slots.map((slot, index) => (
                                    <View key={index} style={styles.slotRow}>
                                        <CustomText fontFamily={Nunito_Bold} color="#767676">{slot.time}</CustomText>
                                        <CustomText fontFamily={Nunito_Bold} color="#767676">{slot.price}</CustomText>
                                    </View>
                                ))}
                            </View>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default PriceModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: wp("90%"),
        backgroundColor: "white",
        borderRadius: hp(2),
        padding: hp(2),
        maxHeight: hp(80),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp(2),
    },
    section: {
        marginBottom: hp(2),
    },
    sectionHeader: {
        backgroundColor: "#e8f8e8",
        padding: hp(1.5),
        borderRadius: hp(1),
        marginBottom: hp(1),
    },

    slotRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: hp(1),
        paddingHorizontal: hp(2),
        borderBottomWidth: 0.5,
        borderBottomColor: "#eee"
    },

    closeButton: {
        padding: hp(0.5),
    }
});