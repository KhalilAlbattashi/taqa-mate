'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, HomeIcon as House, Building, Lightbulb, Sliders, ChevronDown, ChevronUp } from 'lucide-react'
import BasicDetails from './components/BasicDetails'
import BuildingSpecifications from './components/BuildingSpecifications'
import EnergyUsage from './components/EnergyUsage'
import OptionalInputs from './components/OptionalInputs'
import Dashboard from './components/Dashboard'

const steps = [
  { name: 'Basic Details', icon: House },
  { name: 'Building Specifications', icon: Building },
  { name: 'Energy Usage', icon: Lightbulb },
  { name: 'Optional Inputs', icon: Sliders }
]

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    buildingType: '',
    location: '',
    totalFloorArea: '',
    numberOfFloors: '',
    windowToWallRatio: 20,
    monthlyElectricityConsumption: '',
    electricityCost: 0.02,
    hvacUse: '',
    yearOfConstruction: new Date().getFullYear().toString(),
    roofInsulation: false,
    wallInsulation: false,
    solarPanels: false
  })
  const [showSummary, setShowSummary] = useState(false)
  const [selectedRecommendations, setSelectedRecommendations] = useState<string[]>([])

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleInputChange = (name: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicDetails formData={formData} onChange={handleInputChange} />
      case 1:
        return <BuildingSpecifications formData={formData} onChange={handleInputChange} />
      case 2:
        return <EnergyUsage formData={formData} onChange={handleInputChange} />
      case 3:
        return <OptionalInputs formData={formData} onChange={handleInputChange} />
      case 4:
        return <Dashboard formData={formData} selectedRecommendations={selectedRecommendations} setSelectedRecommendations={setSelectedRecommendations} />
      default:
        return null
    }
  }

  const toggleSummary = () => {
    setShowSummary(!showSummary)
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={step.name}
              className={`flex-1 text-center ${
                index <= currentStep ? 'text-yellow-400 font-semibold' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 ${
                  index <= currentStep ? 'border-yellow-400 bg-yellow-400 text-gray-900' : 'border-gray-700 bg-gray-800'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="mt-2 text-sm">{step.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 ${
                index < currentStep ? 'bg-yellow-400' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
      {currentStep === steps.length && (
        <div className="mb-6">
          <button
            onClick={toggleSummary}
            className="flex items-center justify-between w-full p-4 bg-gray-700 rounded-lg text-gray-100 hover:bg-gray-600 transition-colors duration-200"
          >
            <span className="font-semibold">Summary</span>
            {showSummary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {showSummary && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Input Summary</h3>
              <ul className="space-y-2 text-gray-100">
                <li><strong>Building Type:</strong> {formData.buildingType}</li>
                <li><strong>Location:</strong> {formData.location}</li>
                <li><strong>Total Floor Area:</strong> {formData.totalFloorArea} m²</li>
                <li><strong>Number of Floors:</strong> {formData.numberOfFloors}</li>
                <li><strong>Window-to-Wall Ratio:</strong> {formData.windowToWallRatio}%</li>
                <li><strong>Monthly Electricity Consumption:</strong> {formData.monthlyElectricityConsumption} kWh</li>
                <li><strong>Electricity Cost:</strong> {formData.electricityCost} OMR/kWh</li>
                <li><strong>HVAC Use:</strong> {formData.hvacUse}</li>
                <li><strong>Year of Construction:</strong> {formData.yearOfConstruction}</li>
                <li><strong>Roof Insulation:</strong> {formData.roofInsulation ? 'Yes' : 'No'}</li>
                <li><strong>Wall Insulation:</strong> {formData.wallInsulation ? 'Yes' : 'No'}</li>
                <li><strong>Solar Panels:</strong> {formData.solarPanels ? 'Yes' : 'No'}</li>
              </ul>
            </div>
          )}
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-700 p-6 rounded-lg shadow-md"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex justify-between">
        {currentStep > 0 && (
          <button
            onClick={handlePrevious}
            className="px-6 py-2 bg-gray-600 text-gray-100 rounded-full hover:bg-gray-500 transition-colors duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Previous
          </button>
        )}
        {currentStep < steps.length && (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-full hover:bg-yellow-400 transition-colors duration-300 flex items-center"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Submit
                <Zap className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}