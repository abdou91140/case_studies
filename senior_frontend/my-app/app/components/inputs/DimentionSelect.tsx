
import React from 'react';

interface Dimension {
  id: string;
  country: string;
  business_unit: string;
}

interface DimensionSelectProps {
  dimensions: Dimension[];
  onSelect: (dimensionId: string) => void;
}

const DimensionSelect: React.FC<DimensionSelectProps> = ({ dimensions, onSelect }) => {

  return (
    <label className="block">
      Dimension:
      <select  className="block w-full bg-transparent border border-slate-600" onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select a dimension</option>
        {dimensions.map((dim) => (
          <option key={dim.id} value={dim.id}>
            {dim.country} - {dim.business_unit}
          </option>
        ))}
      </select>
    </label>
  );
};

export default DimensionSelect;
