import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

// packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const TimeSlot = ({ time, isSelected, onPress }) => (
    <TouchableOpacity
        style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}
        onPress={onPress}
    >
        <Text style={[styles.timeSlotText, isSelected && styles.selectedText]}>{time}</Text>
    </TouchableOpacity>
);

const TimeSection = ({ title, slots, selectedTimes, onTimeSelect }) => (
    <View style={styles.timeSection}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.timeSlotsContainer}>
            {slots.map((slot) => (
                <TimeSlot
                    key={slot.id}
                    time={slot.timeRange}
                    isSelected={selectedTimes.includes(slot.id)}
                    onPress={() => onTimeSelect(slot)}
                />
            ))}
        </View>
    </View>
);

const HelpScreen = () => {
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [slots, setSlots] = useState([
      { id: 'morning-1', timeRange: '6am - 7am', price: 100 },
      { id: 'morning-2', timeRange: '7am - 8am', price: 100 },
      { id: 'morning-3', timeRange: '8am - 9am', price: 100 },
      { id: 'morning-4', timeRange: '9am - 10am', price: 100 },
      { id: 'morning-5', timeRange: '10am - 11am', price: 100 },  
      { id: 'morning-6', timeRange: '11am - 12pm', price: 100 },  
      { id: 'afternoon-1', timeRange: '12pm - 1pm', price: 100 },
      { id: 'afternoon-2', timeRange: '1pm - 2pm', price: 100 },
      { id: 'afternoon-3', timeRange: '2pm - 3pm', price: 100 },
      { id: 'afternoon-4', timeRange: '3pm - 4pm', price: 100 },
      { id: 'afternoon-5', timeRange: '4pm - 5pm', price: 100 },  
      { id: 'evening-1', timeRange: '5pm - 6pm', price: 100 },
      { id: 'evening-2', timeRange: '6pm - 7pm', price: 100 },
      { id: 'evening-3', timeRange: '7pm - 8pm', price: 100 },
      { id: 'evening-4', timeRange: '8pm - 9pm', price: 100 },
      { id: 'night-1', timeRange: '9pm - 10pm', price: 100 },
      { id: 'night-2', timeRange: '10pm - 11pm', price: 100 },
      { id: 'night-3', timeRange: '11pm - 12am', price: 100 },
      { id: 'night-4', timeRange: '12am - 1am', price: 100 },
  ]);
  

    const handleTimeSelect = (slot) => {
        setSelectedTimes((prevSelectedTimes) => {
            if (prevSelectedTimes.includes(slot.id)) {
                return prevSelectedTimes.filter(id => id !== slot.id);
            }

            const slotIndex = slots.findIndex(s => s.id === slot.id);
            let newSlots = [...slots];

            if ((slotIndex > 0 && prevSelectedTimes.includes(slots[slotIndex - 1].id)) ||
                (slotIndex < slots.length - 1 && prevSelectedTimes.includes(slots[slotIndex + 1].id))) {
                if (!slots[slotIndex].split) {
                    const [start, end] = slot.timeRange.split(' - ');
                    const midTime = start.replace(/(\d+)(am|pm)/, (match, p1, p2) => `${p1}:30${p2}`);
                    const splitSlot1 = { id: slot.id + '-1', timeRange: `${start} - ${midTime}`, split: true, price: 50 };
                    const splitSlot2 = { id: slot.id + '-2', timeRange: `${midTime} - ${end}`, split: true, price: 50 };
                    newSlots.splice(slotIndex, 1, splitSlot1, splitSlot2);
                    setSlots(newSlots);
                }
            }

            return [...prevSelectedTimes, slot.id];
        });
    };

    // Calculate total cost
    const totalCost = selectedTimes.reduce((sum, id) => {
        const slot = slots.find(s => s.id === id);
        return sum + (slot ? slot.price : 0);
    }, 0);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <TimeSection title="Morning" slots={slots.filter(slot => slot.id.startsWith('morning'))} selectedTimes={selectedTimes} onTimeSelect={handleTimeSelect} />
                <TimeSection title="Afternoon" slots={slots.filter(slot => slot.id.startsWith('afternoon'))} selectedTimes={selectedTimes} onTimeSelect={handleTimeSelect} />
                <TimeSection title="Evening" slots={slots.filter(slot => slot.id.startsWith('evening'))} selectedTimes={selectedTimes} onTimeSelect={handleTimeSelect} />
                <TimeSection title="Night" slots={slots.filter(slot => slot.id.startsWith('night'))} selectedTimes={selectedTimes} onTimeSelect={handleTimeSelect} />
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.totalText}>Total Cost: ₹{totalCost}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { flex: 1, padding: 10 },
    timeSection: { marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    timeSlotsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 5,backgroundColor: "#fff", borderRadius: hp(1), padding: hp(1.5), elevation: 5 },
    timeSlot: { flex: 1, paddingVertical: 10, minWidth: hp(12), backgroundColor: '#fff',  margin: 2 , height: hp(5), borderRadius: hp(1)},
    timeSlotText: {textAlign: "center"},
    selectedTimeSlot: { backgroundColor: 'green' },
    selectedText: { color: 'white' },
    footer: { padding: 20, backgroundColor: '#f1f1f1', alignItems: 'center' },
    totalText: { fontSize: 22, fontWeight: 'bold' }
});

export default HelpScreen;
