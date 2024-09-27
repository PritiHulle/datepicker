import React from 'react';
import { useDatePickerStore } from '../state/useDatePickerStore';

const DateRangePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePickerStore();

  return (
    <div className="mb-4">
      <h3 className="text-md font-medium mb-2">Select Date Range</h3>
      <label>Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="p-2 border rounded-md w-full mb-2"
      />
      <label>End Date (optional)</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="p-2 border rounded-md w-full"
      />
    </div>
  );
};

export default DateRangePicker;
