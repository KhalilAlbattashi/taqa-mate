'use client'
import { FormData } from '../types'
import { Zap, DollarSign, Wind, Plus, Minus, Calendar } from 'lucide-react'
import { useState, useMemo } from 'react'

interface EnergyUsageProps {
  formData: FormData
  onChange: (name: string, value: string | number | MonthlyConsumption[]) => void
}

interface MonthlyConsumption {
  month: string
  year: number
  consumption: string
}

export default function EnergyUsage({ formData, onChange }: EnergyUsageProps) {
  const currentYear = new Date().getFullYear()
  
  const availableYears = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => currentYear - i)
  }, [currentYear])

  const [selectedYear, setSelectedYear] = useState(currentYear)
  
  const [monthlyData, setMonthlyData] = useState<MonthlyConsumption[]>(
    formData.monthlyConsumption || Array(12).fill('').map((_, i) => ({
      month: new Date(currentYear, i).toLocaleString('default', { month: 'long' }),
      year: currentYear,
      consumption: ''
    }))
  )

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
  }

  const handleMonthlyChange = (index: number, value: string) => {
    const newData = [...monthlyData]
    newData[index] = { ...newData[index], consumption: value }
    setMonthlyData(newData)
    onChange('monthlyConsumption', newData)
    
    const validConsumptions = newData
      .map(d => parseFloat(d.consumption))
      .filter(n => !isNaN(n))
    
    const average = validConsumptions.length > 0
      ? (validConsumptions.reduce((a, b) => a + b, 0) / validConsumptions.length).toString()
      : ''
    
    onChange('monthlyElectricityConsumption', average)
  }

  const addMonth = () => {
    // Check if the selected year already has 12 months
    const monthsInSelectedYear = monthlyData.filter(data => data.year === selectedYear).length
    
    if (monthsInSelectedYear >= 12) {
      alert(`${selectedYear} already has 12 months. Please select a different year to add more months.`)
      return
    }

    // Add the next month for the selected year
    setMonthlyData([...monthlyData, {
      month: new Date(selectedYear, monthsInSelectedYear).toLocaleString('default', { month: 'long' }),
      year: selectedYear,
      consumption: ''
    }])
  }

  const removeMonth = (index: number) => {
    const newData = monthlyData.filter((_, i) => i !== index)
    setMonthlyData(newData)
    onChange('monthlyConsumption', newData)
  }

  // Group and sort data by year
  const groupedByYear = monthlyData.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = []
    }
    acc[item.year].push(item)
    return acc
  }, {} as Record<number, MonthlyConsumption[]>)

  // Sort months within each year
  Object.values(groupedByYear).forEach(months => {
    months.sort((a, b) => {
      const monthA = new Date(Date.parse(`${a.month} 1, 2000`)).getMonth()
      const monthB = new Date(Date.parse(`${b.month} 1, 2000`)).getMonth()
      return monthA - monthB
    })
  })

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-[#12ae79]" />
            Monthly Electricity Consumption (kWh)
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#12ae79]" />
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#12ae79] focus:border-[#12ae79] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year} ({groupedByYear[year]?.length || 0}/12 months)
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-6">
          {Object.entries(groupedByYear)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, months]) => (
              <div key={year} className="space-y-4">
                <h3 className="text-lg font-semibold text-[#12ae79] flex items-center justify-between">
                  <span>{year}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {months.length}/12 months
                  </span>
                </h3>
                {months.map((data, yearIndex) => {
                  const globalIndex = monthlyData.findIndex(m => m.month === data.month && m.year === data.year)
                  return (
                    <div key={`${year}-${data.month}`} className="flex items-center gap-2">
                      <span className="w-24 text-gray-600 dark:text-gray-300">{data.month}</span>
                      <input
                        type="number"
                        value={data.consumption}
                        onChange={(e) => handleMonthlyChange(globalIndex, e.target.value)}
                        className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#12ae79] focus:border-[#12ae79] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Enter consumption"
                        required
                      />
                      <button
                        onClick={() => removeMonth(globalIndex)}
                        className="p-2 text-red-500 hover:text-red-600"
                        title="Remove month"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  )
                })}
              </div>
            ))}
          <button
            onClick={addMonth}
            className="flex items-center gap-2 text-[#12ae79] hover:text-[#0e8d61] transition-colors"
            disabled={groupedByYear[selectedYear]?.length === 12}
          >
            <Plus className="w-5 h-5" />
            Add Month to {selectedYear} ({groupedByYear[selectedYear]?.length || 0}/12)
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="electricityCost" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-[#12ae79]" />
          Electricity Cost (OMR/kWh)
        </label>
        <input
          type="number"
          id="electricityCost"
          value={formData.electricityCost}
          onChange={(e) => onChange('electricityCost', parseFloat(e.target.value))}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#12ae79] focus:border-[#12ae79] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          step="0.001"
        />
      </div>
      <div>
        <label htmlFor="hvacUse" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
          <Wind className="w-5 h-5 mr-2 text-[#12ae79]" />
          HVAC Use
        </label>
        <select
          id="hvacUse"
          value={formData.hvacUse}
          onChange={(e) => onChange('hvacUse', e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#12ae79] focus:border-[#12ae79] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Select HVAC type</option>
          <option value="Central">Central</option>
          <option value="Split Units">Split Units</option>
          <option value="Window Units">Window Units</option>
          <option value="None">None</option>
        </select>
      </div>
    </div>
  )
}

