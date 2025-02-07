import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import { Colors } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenWidth, widthPercentage } from '../../Utils/Scaling';

const CustomCheckBox = ({ label, isChecked, onCheckedChange }) => {
    return (
        <View style={styles.container}>
            <CheckBox
            
                isChecked={isChecked}
                onClick={() => onCheckedChange(!isChecked)}
                size={25}
                style={styles.checkbox}
                checkBoxColor={Colors.whats_app_green}
                uncheckedCheckBoxColor={Colors.white}
                rightText={label}
                rightTextStyle={styles.textStyle}
                iconStyle={styles.iconStyle}
                innerIconStyle={styles.innerIconStyle}
            />
        </View>
    );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
   
    checkbox: {
        width: widthPercentage(28),
        alignItems:"center",
        justifyContent:"center",
    },
    textStyle: {
        fontFamily: FONTS.Inter_28,
        fontSize: RFValue(14),
        color:Colors.white
      
    },
    iconStyle: {
        borderColor: Colors.green,
    },
    innerIconStyle: {
        borderWidth: 2,
    },
});
