'use client'
import { FormData } from '../types'
import { Zap, TrendingUp, DollarSign, Lightbulb } from 'lucide-react'

interface DashboardProps {
  formData: FormData
  selectedRecommendations: string[]
  setSelectedRecommendations: React.Dispatch<React.SetStateAction<string[]>>
}

interface Recommendation {
  id: string
  title: string
  description: string
  savings: number
  cost: number
  icon: React.ElementType
}

export default function Dashboard({ formData, selectedRecommendations, setSelectedRecommendations }: DashboardProps) {
  // Simple energy analysis (this should be replaced with more accurate calculations)
  const energyIntensity = parseFloat(formData.monthlyElectricityConsumption) / parseFloat(formData.totalFloorArea)
  const estimatedEnergyCost = parseFloat(formData.monthlyElectricityConsumption) * formData.electricityCost

  const recommendations: Recommendation[] = [
    {
      id: "led",
      title: "Upgrade to LED Lighting",
      description: "Replace traditional bulbs with energy-efficient LED lights.",
      savings: 0.15,
      cost: 500,
      icon: Lightbulb
    },
    {
      id: "insulation",
      title: "Improve Insulation",
      description: "Enhance your building's insulation to reduce heat loss and gain.",
      savings: 0.2,
      cost: 2000,
      icon: TrendingUp
    },
    {
      id: "smartThermostats",
      title: "Install Smart Thermostats",
      description: "Use smart thermostats to optimize temperature settings.",
      savings: 0.1,
      cost: 300,
      icon: Zap
    }
  ]

  const toggleRecommendation = (id: string) => {
    setSelectedRecommendations(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    )
  }

  const calculateSavings = () => {
    const baseCost = estimatedEnergyCost
    const savingsPercentage = selectedRecommendations.reduce((total, id) => {
      const recommendation = recommendations.find(r => r.id === id)
      return total + (recommendation?.savings || 0)
    }, 0)
    return baseCost * savingsPercentage
  }

  const calculateNewCost = () => {
    return estimatedEnergyCost - calculateSavings()
  }

  const calculateTotalCost = () => {
    return selectedRecommendations.reduce((total, id) => {
      const recommendation = recommendations.find(r => r.id === id)
      return total + (recommendation?.cost || 0)
    }, 0)
  }

  const calculatePaybackPeriod = () => {
    const totalCost = calculateTotalCost()
    const annualSavings = calculateSavings() * 12
    return annualSavings > 0 ? (totalCost / annualSavings).toFixed(1) : 'N/A'
  }

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Energy Consumption Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Zap className="w-6 h-6 text-yellow-400 mr-2" />
              <p className="text-sm font-medium text-gray-300">Total Energy Use</p>
            </div>
            <p className="text-2xl font-bold text-gray-100">{parseFloat(formData.monthlyElectricityConsumption).toFixed(2)} kWh/month</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
              <p className="text-sm font-medium text-gray-300">Energy Intensity</p>
            </div>
            <p className="text-2xl font-bold text-gray-100">{energyIntensity.toFixed(2)} kWh/m²</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <DollarSign className="w-6 h-6 text-yellow-400 mr-2" />
              <p className="text-sm font-medium text-gray-300">Estimated Energy Cost</p>
            </div>
            <p className="text-2xl font-bold text-gray-100">{estimatedEnergyCost.toFixed(2)} OMR/month</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
              <input
                type="checkbox"
                id={rec.id}
                checked={selectedRecommendations.includes(rec.id)}
                onChange={() => toggleRecommendation(rec.id)}
                className="form-checkbox h-5 w-5 text-yellow-400"
              />
              <div className="flex-grow">
                <label htmlFor={rec.id} className="flex items-center cursor-pointer">
                  <rec.icon className="w-6 h-6 text-yellow-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-100">{rec.title}</h3>
                </label>
                <p className="text-gray-300 mt-1">{rec.description}</p>
                <p className="text-green-400 font-medium mt-1">Potential savings: {(rec.savings * 100).toFixed(0)}%</p>
                <p className="text-yellow-400 font-medium">Estimated cost: {rec.cost.toFixed(2)} OMR</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedRecommendations.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Savings Summary</h2>
          <div className="space-y-2">
            <p className="text-gray-300">Current monthly cost: <span className="font-bold text-gray-100">{estimatedEnergyCost.toFixed(2)} OMR</span></p>
            <p className="text-gray-300">Estimated new monthly cost: <span className="font-bold text-green-400">{calculateNewCost().toFixed(2)} OMR</span></p>
            <p className="text-gray-300">Monthly savings: <span className="font-bold text-green-400">{calculateSavings().toFixed(2)} OMR</span></p>
            <p className="text-gray-300">Total implementation cost: <span className="font-bold text-yellow-400">{calculateTotalCost().toFixed(2)} OMR</span></p>
            <p className="text-gray-300">Estimated payback period: <span className="font-bold text-yellow-400">{calculatePaybackPeriod()} years</span></p>
          </div>
        </div>
      )}
    </div>
  )
}




