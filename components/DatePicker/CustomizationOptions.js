import React from 'react';
import { useDatePickerStore } from '../state/useDatePickerStore';

const CustomizationOptions = () => {
  const { recurrence, customization, setCustomization } = useDatePickerStore();

  const handleInputChange = (e) => {
    setCustomization({ ...customization, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-4">
      <h3 className="text-md font-medium mb-2">Customize Recurrence</h3>
      {recurrence === 'daily' && (
        <div>
          <label>Every</label>
          <input
            type="number"
            name="interval"
            value={customization.interval}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
          /> days
        </div>
      )}
      {recurrence === 'weekly' && (
        <div>
          {/* Allow choosing specific days */}
        </div>
      )}
      {/* Add conditions for monthly and yearly as needed */}
    </div>
  );
};

export default CustomizationOptions;
