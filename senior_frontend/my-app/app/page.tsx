"use client";

import { useState, useEffect } from 'react';
import ESGChart from './components/charts/Co2Charts';
import DimensionSelect from './components/inputs/DimentionSelect';
import MonthInput from './components/inputs/MonthInput';
import TimeGranularitySelect from './components/inputs/TimeGranularitySelect';
import YearInput from './components/inputs/YearInput';
import LoadingSpinner from './components/loading/Loadingspinner';
import useDimensions from './hooks/useDimension';
import useIndicators from './hooks/useIndicators';
import ErrorMessage from './components/error/ErrorMessage';
import HeadcountPieChart from './components/charts/HeadcountCharts';
import Co2Charts from './components/charts/Co2Charts';

interface Dimension {
    id: string;
    country: string;
    business_unit: string;
}

export default function Home() {
    const [selectedDimension, setSelectedDimension] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<Dimension | null>(null);
    const [timeGranularity, setTimeGranularity] = useState<string>('yearly');
    const [startDate, setStartDate] = useState<Date>(new Date(2023, 0, 1));
    const [endDate, setEndDate] = useState<Date>(new Date(2024, 11, 31));
    const [yearDate, setYearDate] = useState<Date | null>(new Date());
    const [dimensions, setDimensions] = useState<Dimension[]>([]);

    const { loading: dimensionsLoading, error: dimensionsError } = useDimensions(setDimensions);
    const { indicators, loading: indicatorsLoading, error: indicatorsError, fetchData: fetchIndicators } = useIndicators(
        selectedDimension,
        startDate,
        endDate
    )

    useEffect(() => {
        if (selectedDimension) {
            fetchIndicators();
        }
    }, [selectedDimension, startDate, endDate, fetchIndicators]);

    const handleDimensionSelect = (dimensionId: string) => {
        setSelectedDimension(dimensionId);
        const dimension = dimensions.find(dim => dim.id === dimensionId);
        if (dimension) {
            setSelectedCountry(dimension);
        } else {
            setSelectedCountry(null);
        }
    };

    const handleYearChange = (date: Date | null) => {
        setYearDate(date);
        setStartDate(new Date(date.getFullYear(), 0, 1));
        setEndDate(new Date(date.getFullYear(), 11, 31));

    };

    const handleMonthChange = (date: Date, setDate: (date: Date) => void) => {
        if (!isNaN(date.getTime())) {
            setDate(date);
        }
    };


    const esgData = indicators
        .filter(indicator => indicator.indicator === 'co2_emissions')
        .map(indicator => ({
            date: indicator.date,
            co2_emissions: indicator.value,
        }));

    const femaleCount = indicators
        .filter(indicator => indicator.indicator === 'female_headcount')
        .reduce((acc, item) => acc + item.value, 0);
    const maleCount = indicators
        .filter(indicator => indicator.indicator === 'male_headcount')
        .reduce((acc, item) => acc + item.value, 0);
    const totalRevenue = indicators
        .filter(indicator => indicator.indicator === 'total_revenue')
        .reduce((acc, item) => acc + item.value, 0);

    const headcount = { female: femaleCount, male: maleCount };
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Test Dashboard</h1>
        <div className="flex flex-col items-center p-4 mb-4 border-slate-300 border-solid border-2 border-indigo-600 rounded">
          <div className="flex justify-center gap-3">
            <DimensionSelect dimensions={dimensions} onSelect={handleDimensionSelect} />
            <TimeGranularitySelect onSelect={setTimeGranularity} />
          </div>
          <div className="flex">
            {timeGranularity === 'yearly' ? (
              <YearInput label="Year" date={yearDate} onChange={handleYearChange} />
            ) : (
              <>
                <MonthInput label="Start Date" date={startDate} onChange={(date) => handleMonthChange(date, setStartDate)} />
                <MonthInput label="End Date" date={endDate} onChange={(date) => handleMonthChange(date, setEndDate)} />
              </>
            )}
          </div>
        </div>
        {dimensionsLoading || indicatorsLoading ? (
          <LoadingSpinner />
        ) : dimensionsError || indicatorsError ? (
          <ErrorMessage error={dimensionsError || indicatorsError} />
        ) : (
          selectedCountry && (
            <>
              <h2 className="text-xl font-semibold mb-4">
                <div>Selected Country: {selectedCountry.country}</div>
                <div>Business Unit: {selectedCountry.business_unit}</div>
                <div>Total revenue: {totalRevenue}</div>

              </h2>
              <div className="flex items-top border-slate-300 border-solid border-2 border-indigo-600 rounded p-5">
                <ESGChart data={esgData} />
                <HeadcountPieChart data={headcount} />
              </div>
            </>
          )
        )}
      </div>
    );
}
