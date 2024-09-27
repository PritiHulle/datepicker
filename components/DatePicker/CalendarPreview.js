"use client";

import React from 'react';
import dayjs from 'dayjs';
import { useDatePickerStore } from '../state/useDatePickerStore';
import { getRecurringDates } from '../utils/getRecurringDates';

const CalendarPreview = () => {
    // Retrieve values from the Zustand store
    const { startDate, endDate, recurrencePattern, customInterval, selectedDays } = useDatePickerStore();

    // Log the state values to the console for debugging
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Recurrence Pattern:', recurrencePattern);
    console.log('Custom Interval:', customInterval);
    console.log('Selected Days:', selectedDays);

    // Generate the recurring dates
    let recurringDates = [];
    try {
        recurringDates = getRecurringDates(startDate, endDate, recurrencePattern, customInterval, selectedDays);
    } catch (error) {
        console.error('Error generating recurring dates:', error);
    }

    console.log('Recurring Dates:', recurringDates); // Log the generated recurring dates

    // Group the recurring dates by month
    const groupedDates = recurringDates.reduce((acc, date) => {
        const month = dayjs(date).format('YYYY-MM');
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(date);
        return acc;
    }, {});

    // Render the days of the week as headers
    const renderDaysOfWeek = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days.map(day => (
            <div key={day} className="text-center font-semibold p-2 border-b">
                {day}
            </div>
        ));
    };

    // Render a mini calendar for each month
    const renderCalendarForMonth = (month, dates) => {
        const startOfMonth = dayjs(month).startOf('month');
        const endOfMonth = dayjs(month).endOf('month');
        const daysInMonth = endOfMonth.date();

        // Create an array of all dates in the month
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(startOfMonth.date(i));
        }

        return (
            <div key={month} className="mb-6">
                <h3 className="text-lg font-bold mb-2">{startOfMonth.format('MMMM YYYY')}</h3>
                <div className="grid grid-cols-7 gap-1">
                    {renderDaysOfWeek()}
                    {/* Empty cells for the beginning of the month */}
                    {Array(startOfMonth.day())
                        .fill(null)
                        .map((_, i) => (
                            <div key={i} className="p-2"></div>
                        ))}
                    {/* Render each day of the month */}
                    {days.map(day => {
                        const isRecurring = dates.includes(day.format('YYYY-MM-DD'));
                        const isToday = day.isSame(dayjs(), 'day');
                        return (
                            <div
                                key={day.format('YYYY-MM-DD')}
                                className={`p-2 text-center border rounded ${
                                    isRecurring ? 'bg-blue-200' : ''
                                } ${isToday ? 'bg-yellow-300 font-bold' : ''}`}
                            >
                                {day.date()}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Calendar Preview</h3>
            <div>
                {Object.keys(groupedDates).length === 0 ? (
                    <p>No recurring dates to display.</p>
                ) : (
                    Object.keys(groupedDates).map(month => renderCalendarForMonth(month, groupedDates[month]))
                )}
            </div>
        </div>
    );
};

export default CalendarPreview;
