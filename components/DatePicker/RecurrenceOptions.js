import React from 'react';
import { useDatePickerStore } from '../state/useDatePickerStore';

const RecurrenceOptions = () => {
  const { recurrence, setRecurrence } = useDatePickerStore();

  return (
    <div className="mb-4">
      <h3 className="text-md font-medium mb-2">Recurrence Pattern</h3>
      <select
        value={recurrence}
        onChange={(e) => setRecurrence(e.target.value)}
        className="p-2 border rounded-md w-full"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};

export default RecurrenceOptions;
