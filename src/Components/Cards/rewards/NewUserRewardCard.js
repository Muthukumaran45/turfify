import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gift, Award, MapPin } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomText from '../../Texts/CustomText';

const NewUserRewardCard = ({ milestoneCount }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <Gift color="#FFD700" size={wp('6%')} />
          </View>
          <CustomText style={styles.headerText}>New User Rewards</CustomText>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.milestoneContainer}>
            <Award color="#FFD700" size={wp('10%')} />
            <View style={styles.textContainer}>
              <CustomText style={styles.titleText}>Turf to Claim</CustomText>
              <Text style={styles.countText}>{milestoneCount}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: wp('4%'),
    overflow: 'hidden',
    marginHorizontal: wp('4%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradientBackground: {
    borderRadius: wp('4%'),
    padding: wp('4%'),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: wp('3%'),
    padding: wp('2%'),
    marginRight: wp('3%'),
  },
  headerText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
  },
  milestoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  textContainer: {
    marginLeft: wp('4%'),
  },
  titleText: {
    color: '#fff',
    fontSize: wp('4%'),
    opacity: 0.9,
  },
  countText: {
    color: '#FFD700',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginTop: hp('0.5%'),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    marginLeft: wp('2%'),
    opacity: 0.8,
  },
});

export default NewUserRewardCard;