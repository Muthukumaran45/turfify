import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { API_URL } from '../../Services/Api';

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import axios from 'axios';

// Components
import Header from '../../Components/Headers/Header';
import { Info, CalendarDays, CloudCog } from 'lucide-react-native';
import { COLORS } from '../../Constants/Colors';
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';
import { navigate } from '../../Utils/NavigationUtil';
import { Nunito_Bold, Nunito_Regular, Roboto_Bold } from '../../Constants/FontFamily';


// store
import Zustand from "../../Zustand/Zustand"
import { errorAlert, successAlert } from '../../Components/Toast/ToastServices';

const BookingDateTimeScreen = ({ route }) => {
  const [showPicker, setShowPicker] = useState(false);

  const currentDate = new Date(); 
  const formattedCurrentDate = moment(currentDate).format('YYYY-MM-DD');

  const [baseDate, setBaseDate] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [date, setDate] = useState(formattedCurrentDate);

  const [selectedTurf, setSelectedTurf] = useState('Full Turf');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState([]);

  const { turfDatas } = route?.params || {};
  const { user } = Zustand();


  useEffect(() => {
    if (date && turfDatas?.turfId) {
      getBookedSlot(date);
    }
  }, [date, turfDatas]);
  

  const getNextDays = (date) => {
    return Array.from({ length: 7 }, (_, i) => moment(date).add(i, 'days'));
  };

  const nextDays = getNextDays(baseDate);

  const handleDatePress = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(date.toDate());
    setDate(formattedDate);
    getBookedSlot(formattedDate)
  };


  const openCalendar = () => {
    setShowPicker(true);
  };

  const onDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      setBaseDate(date);
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setDate(formattedDate)
    }
  };


  const timeSlots = {
    Morning: ["6am - 7am", "7am - 8am", "8am - 9am", "9am - 10am"],
    Noon: ["10am - 11:30am", "11:30am - 12pm"],
    Evening: ["4pm - 5pm", "5pm - 6pm", "6pm - 7pm"],
    Twilight: ["7pm - 8pm", "8pm - 9pm", "9pm - 10pm"],
  };

  const getBookedSlot = async (selectedDate) => {

    try {
      const response = await axios.get(`${API_URL}/bookings/booked?date=${selectedDate}&turfId=${turfDatas.turfId}`);
      const data = response.data
      console.log("booked slot data :", data)

    } catch (error) {
      console.log("Error from  ", error)
    }
  }




  const sendBookingData = async () => {
    navigate("BookingInfoScreen")

    // try {
    //   const response = await axios.post(`${API_URL}/bookings`, {
    //     userId: user._id,
    //     turfId: turfDatas.turfId,
    //     pitchId: turfDatas._id,
    //     date: date,
    //     time: selectedTimeSlot
    //   });

    //   const data = response.data
    //   console.log("res booking data :", data)

    //   if (response && response.status === 201) {
    //     successAlert({ message: "Turf Booked successfully!" });
    //   } else {
    //     errorAlert({ message: "Something went wrong" });
    //   }

    // } catch (error) {
    //   console.log("Error from sending booking data ", error)
    //   errorAlert({ message: error.message });

    // }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View className='flex-row items-center justify-between' style={{paddingHorizontal: hp(2)}}>
        <Header title={'Margin Turf'} />
        <View className='flex-row items-center justify-center gap-5'>
          <TouchableOpacity>
            <Info size={hp(2.5)} strokeWidth={2} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openCalendar}>
            <CalendarDays size={hp(3)} strokeWidth={2} color={"#000"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Selection */}
      <ScrollView horizontal style={styles.dateList}>
        {nextDays.map((date, index) => {
          const isSelected = selectedDate && selectedDate.toDateString() === date.toDate().toDateString();

          return (
            <TouchableOpacity
              key={index}
              style={[styles.dateItem, isSelected && styles.selectedDate]}
              onPress={() => handleDatePress(date)}
            >
              <CustomText size={2.7} fontFamily={Roboto_Bold} style={[styles.dateText, isSelected && styles.selectedText]}>{date.format('D')}</CustomText>
              <CustomText fontFamily={Roboto_Bold} style={[styles.dayText, isSelected && styles.selectedText]}>{date.format('ddd').toUpperCase()}</CustomText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View
        className={`flex-row justify-between items-center`}
        style={{ marginTop: hp(3), marginBottom: hp(1),paddingHorizontal: hp(2) }}
      >
        <View>
          <CustomText size={2.5} fontFamily={Nunito_Bold}>No.of Courts</CustomText>
          <CustomText >Each court varies in different size</CustomText>
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
            <CustomText fontFamily={Nunito_Bold} style={[styles.turfText, selectedTurf === turf && styles.selectedTurfText]}>{turf}</CustomText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Slot Selection */}
      <ScrollView style={styles.timeSlotContainer} showsVerticalScrollIndicator={false}>
        {Object.keys(timeSlots).map((category) => {
          const categoryIcons = {
            Morning: "🌅 Morning",
            Noon: "☀️ Noon",
            Evening: "🌆 Evening",
            Twilight: "🌙 Twilight",
          };

          return (
            <View key={category} style={styles.timeSlotSection}>
              <CustomText fontFamily={Nunito_Bold} style={styles.timeSlotHeading}>{categoryIcons[category]}</CustomText>
              <View style={styles.timeSlotRow}>
                {timeSlots[category].map((time, index) => {
                  const isSelected = selectedTimeSlot === time;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}
                      onPress={() => setSelectedTimeSlot(time)}
                    >
                      <CustomText style={[styles.timeText, isSelected && styles.selectedTimeText]}>
                        {time}
                      </CustomText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}

        <View style={{ marginBottom: hp(10) }} />
      </ScrollView>


      {/* footer */}
      <View style={styles.footer}>

        <View style={styles.selectedDetails}>

          <CustomText fontFamily={Nunito_Bold}>$ 550</CustomText>

          {selectedTimeSlot && (
            <View>
              <CustomText style={styles.selectedTime}>
                {selectedTimeSlot}
              </CustomText>
              <CustomText style={styles.selectedTurfFooter}>
                {selectedTurf}
              </CustomText>
            </View>
          )}
        </View>

        <CustomButton
          className='rounded-md'
          title={'Next >>'}
          onPress={sendBookingData}
        />

      </View>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

export default BookingDateTimeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Date Selection
  dateList: {
    flexDirection: 'row',
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
    marginHorizontal: hp(1)
  },
  selectedDate: {
    backgroundColor: 'green',
  },
  dateText: { fontWeight: 'bold', color: '#000' },
  dayText: { fontSize: hp(1.5), color: '#000', fontWeight: 'bold', },
  selectedText: { color: '#fff' },

  // Turf Selection
  turfSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
    paddingHorizontal: hp(2)
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
    paddingHorizontal: hp(2)
  },
  timeSlotSection: {
    marginBottom: hp(2),

  },
  timeSlotHeading: {
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
