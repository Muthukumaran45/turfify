import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native';
import { X } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// zustand
import useUserStore from "../../../Zustand/Zustand";
import useTurfDetails from "../../../Zustand/useTurfDetails";

// constant
import { API_URL } from '../../../Services/Api';

// packages
import axios from 'axios';

const BulkEnquiryModal = ({ visible, onClose, onSubmit }) => {
    const [description, setDescription] = useState('');

    const token = useUserStore((state) => state.token);
    const user = useUserStore((state) => state.user);
    const turfData = useTurfDetails((state) => state.turfDetails);

    const handleSubmit = () => {
        if (description.trim().length > 0) {
            postBulkEnquiry(description.trim());
            onSubmit(description.trim());
            onClose();
        }
    };

    const postBulkEnquiry = async (reasonText) => {
        const payload = {
            turfId: turfData._id,
            userId: user,
            contactNo: "9840247340",
            reason: reasonText,
        };

        console.log("payload = ", payload);

        try {
            const response = await axios.post(`${API_URL}/bulk-enquiries`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Bulk enquiry submitted:", response.data);
        } catch (error) {
            console.log("Error from postBulkEnquiry:", error);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Bulk Enquiry</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={wp(6)} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        multiline
                        placeholder="Enter your enquiry here..."
                        value={description}
                        onChangeText={setDescription}
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: wp(2),
        padding: wp(5),
        width: wp(90),
        maxWidth: wp(80),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    title: {
        fontSize: wp(5),
        fontWeight: 'bold',
        color: '#000',
    },
    closeButton: {
        padding: wp(2),
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: wp(2),
        padding: wp(3),
        fontSize: wp(4),
        minHeight: hp(15),
        textAlignVertical: 'top',
        marginBottom: hp(2),
    },
    submitButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: wp(2),
        padding: hp(1.5),
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#4a4a4a',
        fontSize: wp(4.5),
        fontWeight: '500',
    },
});

export default BulkEnquiryModal;
