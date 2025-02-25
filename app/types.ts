export interface FormData {
  buildingType: string
  location: string
  totalFloorArea: string
  numberOfFloors: string
  windowToWallRatio: number
  monthlyElectricityConsumption: string
  monthlyConsumption: Array<{
    month: string
    year: number
    consumption: string
  }>
  electricityCost: number
  hvacUse: string
  yearOfConstruction: string
  roofInsulation: boolean
  wallInsulation: boolean
  solarPanels: boolean
}
