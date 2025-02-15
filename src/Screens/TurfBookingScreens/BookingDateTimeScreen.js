import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

// Components
import Header from '../../Components/Headers/Header';
import { Info, CalendarDays } from 'lucide-react-native';
import { COLORS } from '../../Constants/Colors';
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';
import { navigate } from '../../Utils/NavigationUtil';

const BookingDateTimeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [baseDate, setBaseDate] = useState(new Date());
  const [selectedTurf, setSelectedTurf] = useState('Full Turf');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const getNextDays = (date) => {
    return Array.from({ length: 6 }, (_, i) => moment(date).add(i, 'days'));
  };

  const nextDays = getNextDays(baseDate);

  const handleDatePress = (date) => {
    setSelectedDate(date.toDate());
  };

  const openCalendar = () => {
    setShowPicker(true);
  };

  const onDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      setBaseDate(date);
    }
  };

  const timeSlots = {
    Morning: ["6am - 7am", "7am - 8am", "8am - 9am", "9am - 10am"],
    Noon: ["10am - 11:30am", "11:30am - 12pm"],
    Evening: ["4pm - 5pm", "5pm - 6pm", "6pm - 7pm"],
    Twilight: ["7pm - 8pm", "8pm - 9pm", "9pm - 10pm"],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View className='flex-row items-center justify-between'>
        <Header title={'Margin Turf'} />
        <View className='flex-row items-center justify-center gap-5'>
          <TouchableOpacity>
            <Info size={hp(2.5)} strokeWidth={2} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openCalendar}>
            <CalendarDays size={hp(2.5)} strokeWidth={2} color={"#000"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Selection */}
      <View style={styles.dateList}>
        {nextDays.map((date, index) => {
          const isSelected = selectedDate.toDateString() === date.toDate().toDateString();
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dateItem, isSelected && styles.selectedDate]}
              onPress={() => handleDatePress(date)}
            >
              <Text style={[styles.dateText, isSelected && styles.selectedText]}>{date.format('D')}</Text>
              <Text style={[styles.dayText, isSelected && styles.selectedText]}>{date.format('ddd').toUpperCase()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        className={`flex-row justify-between items-center`}
        style={{ marginTop: hp(3), marginBottom: hp(1) }}
      >
        <View>
          <CustomText size={20} className={'font-medium'}>No.of Courts</CustomText>
          <CustomText size={13}>each court varies in different size</CustomText>
        </View>

        <View>
          <CustomText>cricket</CustomText>
        </View>
      </View>

      {/* Turf Selection */}
      <View style={styles.turfSelection}>
        {['Full Turf', 'BOX - A (8v8)', 'BOX - B (8v8)'].map((turf, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.turfOption, selectedTurf === turf && styles.selectedTurf]}
            onPress={() => setSelectedTurf(turf)}
          >
            <CustomText size={13} style={[styles.turfText, selectedTurf === turf && styles.selectedTurfText]}>{turf}</CustomText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Slot Selection */}
      <View style={styles.timeSlotContainer}>
        {Object.keys(timeSlots).map((category) => {
          const categoryIcons = {
            Morning: "🌅 Morning",
            Noon: "☀️ Noon",
            Evening: "🌆 Evening",
            Twilight: "🌙 Twilight",
          };

          return (
            <View key={category} style={styles.timeSlotSection}>
              <CustomText size={15} style={styles.timeSlotHeading}>{categoryIcons[category]}</CustomText>
              <View style={styles.timeSlotRow}>
                {timeSlots[category].map((time, index) => {
                  const isSelected = selectedTimeSlot === time;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}
                      onPress={() => setSelectedTimeSlot(time)}
                    >
                      <CustomText size={13} style={[styles.timeText, isSelected && styles.selectedTimeText]}>
                        {time}
                      </CustomText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>


      {/* footer */}
      <View style={styles.footer}>

        <View style={styles.selectedDetails}>

          <CustomText size={18} className={'font-medium'}>$ 550</CustomText>

          {selectedTimeSlot && (
            <View>
              <CustomText size={12} style={styles.selectedTime}>
                {selectedTimeSlot}
              </CustomText>
              <CustomText size={12} style={styles.selectedTurfFooter}>
                {selectedTurf}
              </CustomText>
            </View>
          )}
        </View>

        <CustomButton
          className='rounded-md'
          title={'Next >>'}
          onPress={() => navigate("BookingInfoScreen")}
        />

      </View>



      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default BookingDateTimeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: hp(2) },

  // Date Selection
  dateList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(14),
    height: hp(7),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedDate: {
    backgroundColor: 'green',
  },
  dateText: { fontSize: hp(2), fontWeight: 'bold', color: '#000' },
  dayText: { fontSize: hp(1.5), color: '#000' },
  selectedText: { color: '#fff' },

  // Turf Selection
  turfSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  turfOption: {
    flex: 1,
    paddingVertical: hp(1.5),
    marginHorizontal: wp(1),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedTurf: {
    backgroundColor: '#C7A34D',
    borderColor: '#C7A34D',
  },
  turfText: {
    color: '#000',
  },
  selectedTurfText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Time Slot Selection
  timeSlotContainer: {
    marginTop: hp(2),
  },
  timeSlotSection: {
    marginBottom: hp(2),
  },
  timeSlotHeading: {
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  timeSlotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    width: wp(29),
    paddingVertical: hp(1.5),
    marginVertical: hp(0.5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: hp(.5)
  },
  selectedTimeSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    color: '#000',
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    padding: hp(2),
    width: wp(100),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",


  },
  selectedDetails: {
    flexDirection: "column",
  },
  selectedTime: {
    color: "#666",
  },
  selectedTurfFooter: {
    color: "#666",
  },

});
