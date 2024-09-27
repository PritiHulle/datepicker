// components/state/useDatePickerStore.js
import {create} from 'zustand';

export const useDatePickerStore = create((set) => ({
    startDate: '',
    endDate: '',
    recurrencePattern: 'daily',
    customInterval: 1,
    selectedDays: [],
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),
    setRecurrencePattern: (pattern) => set({ recurrencePattern: pattern }),
    setCustomInterval: (interval) => set({ customInterval: interval }),
    setSelectedDays: (days) => set({ selectedDays: days }), // Setter for selected days
}));
