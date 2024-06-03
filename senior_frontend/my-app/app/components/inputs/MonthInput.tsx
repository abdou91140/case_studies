"use client";

import React from 'react';
import DatePicker from 'react-date-picker';

interface MonthInputProps {
  label: string;
  date: Date;
  onChange: (date: Date) => void;
}

const MonthInput: React.FC<MonthInputProps> = ({ label, date, onChange }) => {
  return (
    <label className="mt-2">
      <span >{label}:</span>
      <DatePicker
        value={date}
        onChange={onChange}
        format="y-MM-dd"
        showLeadingZeros={true}
        view="year"
        maxDetail="year"
        clearIcon={null}
        className="block w-full bg-white gap-2"
      />
    </label>
  );
};

export default MonthInput;
