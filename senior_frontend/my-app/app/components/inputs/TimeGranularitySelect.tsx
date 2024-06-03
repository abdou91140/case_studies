import React from 'react';

interface TimeGranularitySelectProps {
  onSelect: (granularity: string) => void;
}

const TimeGranularitySelect: React.FC<TimeGranularitySelectProps> = ({ onSelect }) => {
  return (
    <label className='flex flex-col'>
      Time Granularity:
      <select className='bg-transparent border border-slate-600' onChange={(e) => onSelect(e.target.value)}>
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
      </select>
    </label>
  );
};

export default TimeGranularitySelect;
