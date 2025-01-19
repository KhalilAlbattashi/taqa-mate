'use client'
import { FormData } from '../types'
import { Calendar, Shield, Sun } from 'lucide-react'

interface OptionalInputsProps {
  formData: FormData
  onChange: (name: string, value: string | number | boolean) => void
}

export default function OptionalInputs({ formData, onChange }: OptionalInputsProps) {
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(e.target.value);
    const constructionYear = currentYear - inputYear;
    onChange('yearOfConstruction', constructionYear.toString());
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="yearOfConstruction" className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
          Building Age (years)
        </label>
        <input
          type="number"
          id="yearOfConstruction"
          value={new Date().getFullYear() - parseInt(formData.yearOfConstruction)}
          onChange={handleYearChange}
          className="w-full p-3 border border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-gray-100"
          placeholder="Enter building age"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-yellow-400" />
          Insulation
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.roofInsulation}
              onChange={(e) => onChange('roofInsulation', e.target.checked)}
              className="mr-2"
            />
            <span className="text-gray-300">Roof Insulation</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.wallInsulation}
              onChange={(e) => onChange('wallInsulation', e.target.checked)}
              className="mr-2"
            />
            <span className="text-gray-300">Wall Insulation</span>
          </label>
        </div>
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.solarPanels}
            onChange={(e) => onChange('solarPanels', e.target.checked)}
            className="mr-2"
          />
          <Sun className="w-5 h-5 mr-2 text-yellow-400" />
          <span className="text-gray-300">Solar Panels</span>
        </label>
      </div>
    </div>
  )
}
