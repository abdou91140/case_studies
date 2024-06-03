"use client";

import React from 'react';
import DatePicker from 'react-date-picker';

interface YearInputProps {
  label: string;
  date: Date | null;
  onChange: (date: Date | null) => void;
}

const YearInput: React.FC<YearInputProps> = ({ label, date, onChange }) => {
  return (
    <label className="">
      <span className="">{label}:</span>
      <DatePicker
        value={date}
        onChange={onChange}
        format="y"
        showLeadingZeros={true}
        view="decade"
        maxDetail="decade"
        clearIcon={null} 
        className=" w-full bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </label>
  );
};

export default YearInput;
