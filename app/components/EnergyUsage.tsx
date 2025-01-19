'use client'
import { FormData } from '../types'
import { Zap, DollarSign, Wind } from 'lucide-react'

interface EnergyUsageProps {
  formData: FormData
  onChange: (name: string, value: string | number) => void
}

export default function EnergyUsage({ formData, onChange }: EnergyUsageProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="monthlyElectricityConsumption" className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
          Monthly Electricity Consumption (kWh)
        </label>
        <input
          type="number"
          id="monthlyElectricityConsumption"
          value={formData.monthlyElectricityConsumption}
          onChange={(e) => onChange('monthlyElectricityConsumption', e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-gray-100"
          required
        />
      </div>
      <div>
        <label htmlFor="electricityCost" className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
          Electricity Cost (OMR/kWh)
        </label>
        <input
          type="number"
          id="electricityCost"
          value={formData.electricityCost}
          onChange={(e) => onChange('electricityCost', parseFloat(e.target.value))}
          className="w-full p-3 border border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-gray-100"
          step="0.001"
        />
      </div>
      <div>
        <label htmlFor="hvacUse" className="block mb-2 text-sm font-medium text-gray-300 flex items-center">
          <Wind className="w-5 h-5 mr-2 text-yellow-400" />
          HVAC Use
        </label>
        <select
          id="hvacUse"
          value={formData.hvacUse}
          onChange={(e) => onChange('hvacUse', e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-gray-100"
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

