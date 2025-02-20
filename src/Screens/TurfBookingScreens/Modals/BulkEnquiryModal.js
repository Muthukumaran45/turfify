import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import RadioButton from "../../../Components/Buttons/CustomRadioButton";

const options = [
    'Rorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Rorem ipsum dolor sit amet, consectetur.',
    'Rorem dipiscing elit.',
    'Rorem ipsum dolor sit amet, consectetur adipiscing elit.'
];

const BulkEnquiryModal = ({ visible, onClose, onSubmit }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = () => {
        if (selectedOption !== null) {
            console.log('Selected option:', options[selectedOption]);
            onSubmit(options[selectedOption]);
            onClose();
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

                    <View style={styles.optionsContainer}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionRow}
                                onPress={() => setSelectedOption(index)}
                            >
                                <RadioButton
                                    selected={selectedOption === index}
                                    onSelect={() => setSelectedOption(index)}
                                />
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

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
    optionsContainer: {
        marginBottom: hp(2),
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(1.5),
    },
    optionText: {
        marginLeft: wp(3),
        fontSize: wp(4),
        color: '#4a4a4a',
        flex: 1,
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
