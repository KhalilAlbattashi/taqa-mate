'use client'
import { FormData } from '../types'
import { HomeIcon as House, MapPin } from 'lucide-react'

interface BasicDetailsProps {
  formData: FormData
  onChange: (name: string, value: string) => void
}

export default function BasicDetails({ formData, onChange }: BasicDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="buildingType" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
          <House className="w-5 h-5 mr-2 text-[#12ae79]" />
          Building Type
        </label>
        <select
          id="buildingType"
          value={formData.buildingType}
          onChange={(e) => onChange('buildingType', e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#12ae79] focus:border-[#12ae79] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Select building type</option>
          <option value="Residential">Residential</option>
          <option value="Industrial">Industrial</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>
      <div>
        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-[#12ae79]" />
          Location
        </label>
        <select
          id="location"
          value={formData.location}
          onChange={(e) => onChange('location', e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#12ae79] focus:border-[#12ae79] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Select location</option>
          <option value="Muscat, Oman">Muscat, Oman</option>
          <option value="Doha, Qatar">Doha, Qatar</option>
        </select>
      </div>
    </div>
  )
}