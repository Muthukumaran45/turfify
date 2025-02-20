import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ selected, onSelect }) => {
    return (
        <TouchableOpacity onPress={onSelect} style={styles.container}>
            <View style={styles.outer}>
                {selected && <View style={styles.inner} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    outer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#4a4a4a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#4CAF50',
    },
});

export default RadioButton;
