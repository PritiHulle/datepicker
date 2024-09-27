// components/utils/getRecurringDates.js
import dayjs from 'dayjs';

export const getRecurringDates = (startDate, endDate, recurrencePattern, customInterval, selectedDays) => {
    const dates = [];
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (!start.isValid() || !end.isValid() || start.isAfter(end)) return dates;

    let current = start;

    while (current.isBefore(end) || current.isSame(end, 'day')) {
        if (recurrencePattern === 'daily') {
            dates.push(current.format('YYYY-MM-DD'));
            current = current.add(customInterval, 'day');
        } else if (recurrencePattern === 'weekly') {
            const dayOfWeek = current.format('ddd'); // Get current day of the week
            if (selectedDays.includes(dayOfWeek)) {
                dates.push(current.format('YYYY-MM-DD')); // Add to dates if selected
            }
            current = current.add(1, 'day'); // Move to the next day
        } else if (recurrencePattern === 'monthly') {
            dates.push(current.format('YYYY-MM-DD'));
            current = current.add(customInterval, 'month');
        } else if (recurrencePattern === 'yearly') {
            dates.push(current.format('YYYY-MM-DD'));
            current = current.add(customInterval, 'year');
        }
    }

    return dates;
};
