// utils/timeUtils.js

/**
 * Extracts time range from selected slots.
 * @param {Array} selectedSlots - Array of time slot objects.
 * @returns {string} Formatted time range or 'Not specified'.
 */
export const extractTime = (selectedSlots) => {
    if (!selectedSlots || !selectedSlots.length || !selectedSlots[0]) {
      return "Not specified";
    }
  
    const slot = selectedSlots[0];
    const startTime = slot.startTime || "Not specified";
    const endTime = slot.endTime || "Not specified";
  
    return `${startTime} - ${endTime}`;
  };
  