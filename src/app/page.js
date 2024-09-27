// pages/index.js
//import DatePicker from '../components/DatePicker/DatePicker';
import DatePicker from '../../components/DatePicker/DatePicker'
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-6">Recurring Date Picker</h1>
      
      {/* Render the DatePicker component */}
      <DatePicker />
    </div>
  );
}
