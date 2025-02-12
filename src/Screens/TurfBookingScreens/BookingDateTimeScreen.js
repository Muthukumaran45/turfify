import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';

const TimeSlot = ({ time, isSelected, isPartOfSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.timeSlot,
      isSelected && styles.selectedTimeSlot,
      isPartOfSelected && styles.partOfSelectedTimeSlot
    ]}
    onPress={onPress}
  >
    <Text style={[
      styles.timeText,
      (isSelected || isPartOfSelected) && styles.selectedTimeText
    ]}>{time}</Text>
  </TouchableOpacity>
);

const TimeSection = ({ period, slots, selectedTime, onTimeSelect }) => {
  const getIcon = () => {
    switch(period) {
      case 'Morning': return '☀️';
      case 'Noon': return '☀️';
      case 'Evening': return '🌙';
      case 'Twilight': return '🌑';
      default: return '☀️';
    }
  };

  const isPartOfSelectedTimeRange = (time) => {
    if (selectedTime === '10am-11:30am') {
      return time === '10am' || time === '11am';
    }
    return false;
  };

  return (
    <View style={styles.timeSection}>
      <View style={styles.periodHeader}>
        <Text style={styles.periodIcon}>{getIcon()}</Text>
        <Text style={styles.periodText}>{period}</Text>
      </View>
      <View style={styles.timeGrid}>
        {slots.map((time, index) => (
          <TimeSlot
            key={`${time}-${index}`}
            time={time}
            isSelected={selectedTime === time}
            isPartOfSelected={isPartOfSelectedTimeRange(time)}
            onPress={() => onTimeSelect(time)}
          />
        ))}
      </View>
    </View>
  );
};

const BookingDateTimeScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(17);
  const [selectedTime, setSelectedTime] = useState("10am-11:30am");
  const [selectedCourt, setSelectedCourt] = useState("Full Turf");

  const weekDays = [
    { day: "SAT", date: 15 },
    { day: "SUN", date: 16 },
    { day: "MON", date: 17 },
    { day: "TUE", date: 18 },
    { day: "WED", date: 19 },
    { day: "THU", date: 20 },
  ];

  const timeSlots = {
    Morning: [
      "6am", "7am", "7am", "8am", "8am", "9am",
      "9am", "10am", "10am-11:30am", "12pm"
    ],
    Noon: [
      "12pm", "1pm", "1pm", "2pm", "2pm", "3pm",
      "3pm", "4pm", "4pm", "5pm", "5pm", "6pm"
    ],
    Evening: [
      "6pm", "7pm", "7pm", "8pm", "8pm", "9pm",
      "9pm", "10pm", "10pm", "11pm", "11pm", "12am"
    ],
    Twilight: [
      "12am", "1am", "1am", "2am", "2am", "3am",
      "3am", "4am", "4am", "5am", "5am", "6am"
    ]
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KOOTTAM TURF</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.infoButton}>
            <Text>ⓘ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calendarButton}>
            <Text>📅</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Selector */}
      <View style={styles.dateSelector}>
        {weekDays.map(({ day, date }) => (
          <TouchableOpacity
            key={date}
            style={[
              styles.dateBox,
              selectedDate === date && styles.selectedDate
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>{date}</Text>
            <Text style={[styles.dayText, selectedDate === date && styles.selectedDayText]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Court Types */}
      <View style={styles.courtSection}>
        <View style={styles.courtHeaderRow}>
          <View>
            <Text style={styles.courtTitle}>NO.of Courts</Text>
            <Text style={styles.courtSubtitle}>Each court varies in different size</Text>
          </View>
          <View style={styles.sportBadge}>
            <Text style={styles.sportText}>🏏 Cricket</Text>
          </View>
        </View>
        
        <View style={styles.courtButtons}>
          <TouchableOpacity 
            style={[styles.courtButton, selectedCourt === "Full Turf" && styles.selectedCourtButton]}
            onPress={() => setSelectedCourt("Full Turf")}
          >
            <Text style={styles.courtButtonText}>Full Turf</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.courtButton, selectedCourt === "BOX-A" && styles.selectedCourtButton]}
            onPress={() => setSelectedCourt("BOX-A")}
          >
            <Text style={styles.courtButtonText}>BOX - A (8v8)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.courtButton, selectedCourt === "BOX-B" && styles.selectedCourtButton]}
            onPress={() => setSelectedCourt("BOX-B")}
          >
            <Text style={styles.courtButtonText}>BOX - B (8v8)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Time Slots */}
      <ScrollView style={styles.timeSlotsContainer} showsVerticalScrollIndicator={false}>
        {Object.entries(timeSlots).map(([period, slots]) => (
          <TimeSection
            key={period}
            period={period}
            slots={slots}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />
        ))}
      </ScrollView>

      {/* Bottom Price Bar */}
      <View style={styles.priceBar}>
        <View style={styles.priceContent}>
          <View style={styles.offerBadge}>
            <Text style={styles.offerText}>Offer applied! you saving 150</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>₹ 550</Text>
            <Text style={styles.originalPrice}>₹650</Text>
          </View>
          <Text style={styles.timeSelected}>box A</Text>
        </View>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => navigation.navigate("BookingInfoScreen")}
        >
          <Text style={styles.nextButtonText}>Next »</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    marginRight: wp(3),
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedDate: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  dateText: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: RFValue(10),
    color: '#666',
  },
  selectedDateText: {
    color: '#fff',
  },
  selectedDayText: {
    color: '#fff',
  },
  courtSection: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  courtHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  courtTitle: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  courtSubtitle: {
    fontSize: RFValue(10),
    color: '#666',
  },
  sportBadge: {
    backgroundColor: '#fff3e0',
    padding: wp(2),
    borderRadius: wp(2),
  },
  sportText: {
    fontSize: RFValue(12),
  },
  courtButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  courtButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: hp(1.2),
    borderRadius: wp(1),
    marginHorizontal: wp(1),
    alignItems: 'center',
  },
  selectedCourtButton: {
    backgroundColor: '#FFD700',
  },
  courtButtonText: {
    fontSize: RFValue(12),
  },
  timeSlotsContainer: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  timeSection: {
    marginBottom: hp(2),
    backgroundColor: '#f8f8f8',
    borderRadius: wp(2),
    padding: wp(3),
  },
  periodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  periodIcon: {
    fontSize: RFValue(16),
    marginRight: wp(2),
  },
  periodText: {
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(1),
  },
  timeSlot: {
    width: wp(15),
    paddingVertical: hp(1),
    backgroundColor: '#fff',
    borderRadius: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.5),
  },
  selectedTimeSlot: {
    backgroundColor: '#4CAF50',
  },
  partOfSelectedTimeSlot: {
    backgroundColor: '#4CAF50',
  },
  timeText: {
    fontSize: RFValue(12),
    color: '#000',
  },
  selectedTimeText: {
    color: '#fff',
  },
  priceBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceContent: {
    flex: 1,
  },
  offerBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: wp(1),
    alignSelf: 'flex-start',
    marginBottom: hp(0.5),
  },
  offerText: {
    color: '#fff',
    fontSize: RFValue(12),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginRight: wp(2),
  },
  originalPrice: {
    fontSize: RFValue(14),
    color: '#666',
    textDecorationLine: 'line-through',
  },
  timeSelected: {
    fontSize: RFValue(12),
    color: '#666',
    marginTop: hp(0.5),
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderRadius: wp(1),
    marginLeft: wp(3),
  },
  nextButtonText: {
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: '500',
  },
});

export default BookingDateTimeScreen;