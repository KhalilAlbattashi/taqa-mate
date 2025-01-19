'use client'
import { FormData } from '../types'
import { SquareIcon as SquareFoot, Building2, Maximize } from 'lucide-react'

interface BuildingSpecificationsProps {
  formData: FormData
  onChange: (name: string, value: string | number) => void
}

export default function BuildingSpecifications({ formData, onChange }: BuildingSpecificationsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="totalFloorArea" className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
          <SquareFoot className="w-5 h-5 mr-2 text-yellow-400" />
          Total Floor Area (m²)
        </label>
        <input
          type="number"
          id="totalFloorArea"
          value={formData.totalFloorArea}
          onChange={(e) => onChange('totalFloorArea', e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-gray-100"
          required
        />
      </div>
      <div>
        <label htmlFor="numberOfFloors" className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-yellow-400" />
          Number of Floors
        </label>
        <input
          type="number"
          id="numberOfFloors"
          value={formData.numberOfFloors}
          onChange={(e) => onChange('numberOfFloors', e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-gray-100"
          required
        />
      </div>
      <div>
        <label htmlFor="windowToWallRatio" className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
          <Maximize className="w-5 h-5 mr-2 text-yellow-400" />
          Window-to-Wall Ratio (%)
        </label>
        <input
          type="range"
          id="windowToWallRatio"
          min="0"
          max="100"
          value={formData.windowToWallRatio}
          onChange={(e) => onChange('windowToWallRatio', parseInt(e.target.value))}
          className="w-full"
        />
        <span className="text-sm text-gray-400">{formData.windowToWallRatio}%</span>
      </div>
    </div>
  )
}





