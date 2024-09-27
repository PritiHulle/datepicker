"use client";

import React, { useState, useEffect } from 'react';
import { useDatePickerStore } from '../state/useDatePickerStore';
import CalendarPreview from './CalendarPreview';

const DatePicker = () => {
    const { setStartDate, setEndDate, setRecurrencePattern, setCustomInterval, setSelectedDays } = useDatePickerStore();
    const [recurrence, setRecurrence] = useState('daily');
    const [customInterval, setCustomIntervalState] = useState(1);
    const [selectedDays, setSelectedDaysState] = useState([]);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleRecurrenceChange = (event) => {
        const selectedRecurrence = event.target.value;
        setRecurrence(selectedRecurrence);
        setRecurrencePattern(selectedRecurrence);
    };

    const handleCustomIntervalChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setCustomIntervalState(value);
        setCustomInterval(value);
    };

    const handleDaySelection = (day) => {
        setSelectedDaysState((prev) => {
            const newSelectedDays = prev.includes(day)
                ? prev.filter(d => d !== day) // Deselect the day
                : [...prev, day]; // Select the day
            setSelectedDays(newSelectedDays); // Update Zustand store
            return newSelectedDays;
        });
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="start-date" className=" font-semibold mt-2  mb-2">Start Date:</label>
            <input
                type="date"
                id="start-date"
                onChange={handleStartDateChange}
                className="p-2 w-1/2 border rounded"
            />
            
            <label htmlFor="end-date" className=" font-semibold mt-2  mb-2">End Date:</label>
            <input
                type="date"
                id="end-date"
                onChange={handleEndDateChange}
                className="p-2 w-1/2  border rounded"
            />

            <label htmlFor="recurrence" className="font-semibold mt-2  mb-2">Recurrence:</label>
            <select
                id="recurrence"
                value={recurrence}
                onChange={handleRecurrenceChange}
                className="p-2 w-1/2 border rounded"
            >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            {recurrence === 'daily' && (
                <>
            <label htmlFor="custom-interval" className="font-semibold mt-2  mb-2">Every X:</label>
            <input
                type="number"
                id="custom-interval"
                value={customInterval}
                onChange={handleCustomIntervalChange}
                className="p-2 w-1/2 border rounded"
            />
</>
            )}

            {recurrence === 'weekly' && (
                <>
                    <label className="mt-4 font-semibold mb-4 p-4">Select Days of the Week:</label>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <label key={day} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value={day}
                                checked={selectedDays.includes(day)}
                                onChange={() => handleDaySelection(day)}
                                className="ml-2"
                            />
                            {day}
                        </label>
                    ))}
                </>
            )}

            {/* Render the Calendar Preview */}
            <CalendarPreview />
        </div>
    );
};

export default DatePicker;
