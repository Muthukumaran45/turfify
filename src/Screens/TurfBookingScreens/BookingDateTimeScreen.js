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
import { Info, CalendarDays, CloudCog, CloudDownload } from 'lucide-react-native';
import { COLORS } from '../../Constants/Colors';
import CustomText from '../../Components/Texts/CustomText';
import CustomButton from '../../Components/Buttons/CustomButton';
import { navigate } from '../../Utils/NavigationUtil';
import { Nunito_Bold, Nunito_Regular, Roboto_Bold } from '../../Constants/FontFamily';

// store
import useUserStore from "../../Zustand/Zustand"
import useTurfDetails from "../../Zustand/useTurfDetails";
import useBookingStore from '../../Zustand/useBookingStore';


import { errorAlert, successAlert } from '../../Components/Toast/ToastServices';

const BookingDateTimeScreen = () => {
  const [showPicker, setShowPicker] = useState(false);

  const turfDatas = useTurfDetails((state) => state.turfDetails);
  const token = useUserStore((state) => state.token);
  const userid = useUserStore((state) => state.user);

  // {"data": {"appliedVoucherCode": null, "discountAmount": 0, "finalPayableAmount": 802, "originalPrice": 850, "pointsUsed": 48}, "success": true}
  const currentDate = new Date();
  const formattedCurrentDate = moment(currentDate).format('YYYY-MM-DD');

  const [baseDate, setBaseDate] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [date, setDate] = useState(formattedCurrentDate);

  const [selectedTurf, setSelectedTurf] = useState('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedTimeSlotDetails, setSelectedTimeSlotDetails] = useState([]); // New state to store time slot details with prices
  const [bookedSlots, setBookedSlots] = useState([]);

  const [pitchesData, setPitchesData] = useState([]);
  const [categorizedTimeSlots, setCategorizedTimeSlots] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price

  // Function to check if a date is a weekend
  const isWeekend = (date) => {
    const day = moment(date).day();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  // Function to categorize time slots by time of day
  const categorizeTimeSlots = (pitch) => {
    if (!pitch || !pitch.timeSlots) return {};

    const categorized = {
      Morning: [],
      Noon: [],
      Evening: [],
      Twilight: []
    };

    pitch.timeSlots.forEach(slot => {
      const startHour = parseInt(slot.startTime.split(' ')[0]);
      const timeOfDay = slot.startTime.split(' ')[1];

      if ((timeOfDay === 'AM' && startHour >= 6) || (timeOfDay === 'AM' && startHour < 10)) {
        categorized.Morning.push(slot);
      } else if ((timeOfDay === 'AM' && startHour >= 10) || (timeOfDay === 'PM' && startHour < 4)) {
        categorized.Noon.push(slot);
      } else if (timeOfDay === 'PM' && startHour >= 4 && startHour < 7) {
        categorized.Evening.push(slot);
      } else if (timeOfDay === 'PM' && startHour >= 7) {
        categorized.Twilight.push(slot);
      }
    });

    // Filter out empty categories
    return Object.fromEntries(
      Object.entries(categorized).filter(([_, slots]) => slots.length > 0)
    );
  };

  useEffect(() => {
    if (turfDatas?.pitches) {
      setPitchesData(turfDatas.pitches);
      // Automatically select the first pitch when data is loaded
      if (turfDatas.pitches.length > 0) {
        setSelectedTurf(turfDatas.pitches[0].name);
        setCategorizedTimeSlots(categorizeTimeSlots(turfDatas.pitches[0]));
      }
    }
  }, [turfDatas]);

  useEffect(() => {
    // Update categorized time slots when the selected turf changes
    if (selectedTurf && pitchesData.length > 0) {
      const selectedPitch = pitchesData.find(pitch => pitch.name === selectedTurf);
      if (selectedPitch) {
        setCategorizedTimeSlots(categorizeTimeSlots(selectedPitch));
        // Clear the selected time slots when changing pitches
        setSelectedTimeSlots([]);
        setSelectedTimeSlotDetails([]);
        setTotalPrice(0);
      }
    }
  }, [selectedTurf, pitchesData]);

  useEffect(() => {
    if (date && turfDatas?.turfId) {
      getBookedSlot(date);
    }
  }, [date, turfDatas]);

  // Calculate total price whenever selected time slots or date changes
  useEffect(() => {
    calculateTotalPrice();
  }, [selectedTimeSlotDetails, selectedDate]);

  const getNextDays = (date) => {
    return Array.from({ length: 7 }, (_, i) => moment(date).add(i, 'days'));
  };

  const nextDays = getNextDays(baseDate);

  const handleDatePress = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(date.toDate());
    setDate(formattedDate);
    getBookedSlot(formattedDate);
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
      setDate(formattedDate);
    }
  };

  const getBookedSlot = async (selectedDate) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/booked?date=${selectedDate}&turfId=${turfDatas.turfId}`);
      const data = response.data;
      setBookedSlots(data.bookedSlots || []);
      console.log("booked slot data:", data);
    } catch (error) {
      console.log("Error from", error);
    }
  };

  const isSlotBooked = (startTime, endTime) => {
    return bookedSlots.some(slot =>
      slot.startTime === startTime && slot.endTime === endTime
    );
  };

  const calculateTotalPrice = () => {
    const isSelectedDateWeekend = isWeekend(selectedDate);
    let total = 0;

    selectedTimeSlotDetails.forEach(slotDetail => {
      if (isSelectedDateWeekend) {
        total += slotDetail.pricing.weekend.discountPrice;
      } else {
        total += slotDetail.pricing.weekdays.discountPrice;
      }
    });

    setTotalPrice(total);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    const timeSlotKey = `${timeSlot.startTime} - ${timeSlot.endTime}`;

    setSelectedTimeSlots(prevSelected => {
      if (prevSelected.includes(timeSlotKey)) {
        // Remove if already selected
        const newTimeSlots = prevSelected.filter(slot => slot !== timeSlotKey);

        // Also remove from details
        setSelectedTimeSlotDetails(prevDetails =>
          prevDetails.filter(detail =>
            `${detail.startTime} - ${detail.endTime}` !== timeSlotKey
          )
        );

        return newTimeSlots;
      } else {
        // Add if not already selected

        // Also add to details
        setSelectedTimeSlotDetails(prevDetails => [
          ...prevDetails,
          {
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            pricing: timeSlot.pricing
          }
        ]);

        return [...prevSelected, timeSlotKey];
      }
    });
  };


  const sendBookingData = async () => {
    if (selectedTimeSlots.length === 0) {
      console.log("Please select at least one time slot");
      return;
    }
  
    const gstAmount = totalPrice * 0.10;
    const finalAmount = totalPrice + gstAmount;
    const advanceAmount = Math.round(finalAmount / 2);
  
    const bookingStore = useBookingStore.getState();
    bookingStore.setBookingInfo({
      selectedDate: moment(selectedDate).format('DD-MM-YYYY'),
      selectedTurf: selectedTurf,
      selectedTimeSlots: selectedTimeSlots,
      selectedTimeSlotDetails: selectedTimeSlotDetails,
      totalPrice: totalPrice,
      gstAmount: gstAmount,
      finalAmount: finalAmount,
      advanceAmount: advanceAmount,
    });
  
    const payload = {
      userId: userid,
      turfId: turfDatas?._id,
      usePoints: true,
      voucherCode: "SUMMER50",
      selectedDate: moment(selectedDate).format('YYYY-MM-DD'),
      selectedSlots: selectedTimeSlotDetails.map(slot => ({
        pitchName: selectedTurf,
        startTime: slot.startTime,
        endTime: slot.endTime
      }))
    };
  
    try {
      console.log("payload :", payload)
      const response = await axios.post(`${API_URL}/bookings/preCalculateBooking`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = response.data;
      console.log("data ==", data);
  
      // ✅ Only navigate after successful response
      navigate("BookingInfoScreen");
  
    } catch (error) {
      console.log("Error from preCalculateBooking:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Header title={turfDatas?.turfName} />
        <View style={styles.headerButtons}>
          <TouchableOpacity>
            <Info size={hp(3)} strokeWidth={2} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openCalendar}>
            <CalendarDays size={hp(3)} strokeWidth={2} color={"#000"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Selection - FIXED HEIGHT */}
      <View style={styles.datePickerContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateList}>
          {nextDays.map((date, index) => {
            const isSelected = selectedDate && selectedDate.toDateString() === date.toDate().toDateString();

            return (
              <TouchableOpacity
                key={index}
                style={[styles.dateItem, isSelected && styles.selectedDate]}
                onPress={() => handleDatePress(date)}
              >
                <CustomText size={2.5} fontFamily={Roboto_Bold} style={[styles.dateText, isSelected && styles.selectedText]}>{date.format('D')}</CustomText>
                <CustomText size={1.5} fontFamily={Roboto_Bold} style={[styles.dayText, isSelected && styles.selectedText]}>{date.format('ddd').toUpperCase()}</CustomText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.courtsInfoContainer}>
        <View>
          <CustomText size={2.5} fontFamily={Nunito_Bold}>No.of Courts</CustomText>
          <CustomText>Each court varies in different size</CustomText>
        </View>

        <View>
          <CustomText>cricket</CustomText>
        </View>
      </View>

      {/* Turf Selection */}
      <View style={styles.turfSelection}>
        {pitchesData.map((pitch, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.turfOption,
              selectedTurf === pitch.name && styles.selectedTurf,
            ]}
            onPress={() => setSelectedTurf(pitch.name)}
          >
            <CustomText
              fontFamily={Nunito_Bold}
              style={[
                styles.turfText,
                selectedTurf === pitch.name && styles.selectedTurfText,
              ]}
            >
              {pitch.name}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Slot Selection */}
      <ScrollView style={styles.timeSlotContainer} showsVerticalScrollIndicator={false}>
        {Object.keys(categorizedTimeSlots).length > 0 ? (
          Object.keys(categorizedTimeSlots).map((category) => {
            const categoryIcons = {
              Morning: "🌅 Morning",
              Noon: "☀️ Noon",
              Evening: "🌆 Evening",
              Twilight: "🌙 Twilight",
            };

            // Only show categories that have time slots
            if (categorizedTimeSlots[category].length === 0) return null;

            return (
              <View key={category} style={styles.timeSlotSection}>
                <CustomText fontFamily={Nunito_Bold} style={styles.timeSlotHeading}>{categoryIcons[category]}</CustomText>
                <View style={styles.timeSlotRow}>
                  {categorizedTimeSlots[category].map((timeSlot, index) => {
                    const timeSlotKey = `${timeSlot.startTime} - ${timeSlot.endTime}`;
                    const isSelected = selectedTimeSlots.includes(timeSlotKey);
                    const isBooked = isSlotBooked(timeSlot.startTime, timeSlot.endTime);

                    // Get price information based on weekday/weekend
                    const isDateWeekend = isWeekend(selectedDate);
                    const priceInfo = isDateWeekend
                      ? timeSlot.pricing.weekend
                      : timeSlot.pricing.weekdays;

                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.timeSlot,
                          isSelected && styles.selectedTimeSlot,
                          isBooked && styles.bookedTimeSlot
                        ]}
                        onPress={() => {
                          if (isBooked) return;
                          handleTimeSlotSelect(timeSlot);
                        }}
                        disabled={isBooked}
                      >
                        <CustomText
                          style={[
                            styles.timeText,
                            isSelected && styles.selectedTimeText,
                            isBooked && styles.bookedTimeText
                          ]}
                        >
                          {timeSlotKey}
                        </CustomText>

                        <CustomText
                          style={[
                            styles.priceText,
                            isSelected && styles.selectedTimeText,
                            isBooked && styles.bookedTimeText
                          ]}
                        >
                          ₹{priceInfo.discountPrice}
                          {priceInfo.originalPrice > priceInfo.discountPrice && (
                            <CustomText style={styles.originalPrice}> ₹{priceInfo.originalPrice}</CustomText>
                          )}
                        </CustomText>

                        {isBooked && (
                          <CustomText style={styles.bookedLabel}>Booked</CustomText>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.noSlotsContainer}>
            <CustomText style={styles.noSlotsText}>No time slots available for this pitch.</CustomText>
          </View>
        )}

        <View style={{ marginBottom: hp(10) }} />
      </ScrollView>

      {/* footer */}
      <View style={styles.footer}>
        <View style={styles.selectedDetails}>
          <CustomText fontFamily={Nunito_Bold}>₹ {totalPrice}</CustomText>

          {selectedTimeSlots.length > 0 && (
            <View>
              <CustomText style={styles.selectedTime}>
                {selectedTimeSlots.length === 1
                  ? selectedTimeSlots[0]
                  : `${selectedTimeSlots.length} time slots selected`}
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
          disabled={selectedTimeSlots.length === 0}
          style={{borderRadius: hp(1)}}
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
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  // Header
  headerContainer: {
    paddingHorizontal: hp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hp(1),
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: hp(1.5)
  },

  // Date Selection - FIXED SIZE
  datePickerContainer: {
    height: hp(8), // Fixed height
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dateList: {
    flexDirection: 'row',
    paddingVertical: hp(0.5),
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(12),
    height: hp(6),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: wp(1.5),
  },
  selectedDate: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dateText: {
    fontWeight: 'bold',
    color: '#000'
  },
  dayText: {
    color: '#000',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#fff'
  },

  // Courts Info Section
  courtsInfoContainer: {
    marginTop: hp(1.5),
    marginBottom: hp(1),
    paddingHorizontal: hp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Turf Selection
  turfSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1.5),
    paddingHorizontal: hp(2),
  },
  turfOption: {
    flex: 1,
    paddingVertical: hp(1.2),
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
    flex: 1,
    paddingHorizontal: hp(2),
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
    paddingVertical: hp(1.2),
    marginVertical: hp(0.5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: wp(1.5)
  },
  selectedTimeSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  bookedTimeSlot: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
    opacity: 0.7,
  },
  timeText: {
    color: '#000',
    fontSize: hp(2),
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookedTimeText: {
    color: '#999',
  },
  bookedLabel: {
    color: '#999',
    fontSize: hp(1.2),
    fontStyle: 'italic',
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    padding: hp(2),
    width: wp(100),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 5,
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
  noSlotsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp(5),
  },
  noSlotsText: {
    color: '#888',
    fontSize: hp(2),
    textAlign: 'center',
  },
  priceText: {
    marginTop: hp(0.4),
    fontSize: hp(1.5),
    color: '#333333',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#888888',
    fontSize: hp(1.5),
  },
});