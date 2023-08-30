import axios from "axios"
import { API_URL } from "./constants"

export type incompleteColor = {
  id: number
  name: string
  figure?: number
  hex: string
}

const incompleteRingColors: incompleteColor[] = [
  { id: 0, name: 'pink', hex: '#d8a0a6' },
  { id: 1, name: 'silver', hex: '#c0c0c0' },
  { id: 2, name: 'gold', hex: '#ffd700' },
  { id: 3, name: 'black', figure: 0, hex: '#0e0e10' },
  { id: 4, name: 'brown', figure: 1, hex: '#7e4b26' },
  { id: 5, name: 'red', figure: 2, hex: '#a72920' },
  { id: 6, name: 'orange', figure: 3, hex: '#f67828' },
  { id: 7, name: 'yellow', figure: 4, hex: '#f6b600' },
  { id: 8, name: 'green', figure: 5, hex: '#61993b' },
  { id: 9, name: 'blue', figure: 6, hex: '#007cb0' },
  { id: 10, name: 'violet', figure: 7, hex: '#76689a' },
  { id: 11, name: 'gray', figure: 8, hex: '#7a888e' },
  { id: 12, name: 'white', figure: 9, hex: '#e3d9c6' }
]

type colorAPIValues = {
  id: number
  name: string
  multiplier: number
  tolerance: number | null
}

export type ringColor = incompleteColor & colorAPIValues

export const getCompleteRingColors: () => Promise< ringColor[] > = async () => {
  const { data: multiplierToleranceValues }: { data: colorAPIValues[] } = await axios.get(`${API_URL}/colors`)
  const sortedIncompleteRingColors = incompleteRingColors.sort((a, b) => a.id - b.id)
  const sortedMultiplierToleranceValues = multiplierToleranceValues.sort((a, b) => a.id - b.id)
  const ringColors = sortedIncompleteRingColors.map((incompleteRingColor, index) => {
    return { ...incompleteRingColor, ...sortedMultiplierToleranceValues[index] }
  })
  return ringColors
}

export const getSignificantFigureColors: () => incompleteColor[] = () => {
  const significantFigureColors = incompleteRingColors.filter(color => typeof color.figure !== 'undefined')
  return significantFigureColors
}

export const getMultiplierColors: (ringColors: ringColor[]) => ringColor[] = (ringColors) => {
  // Sé que esta función es innecesaria, pero la creé para que se puedan obtener los colores multiplicadores y los colores de tolerancia ambos de la
  // misma forma (mediante una función), y así tener un código más uniforme y legible
  return ringColors
}

export const getToleranceColors: (ringColors: ringColor[]) => ringColor[] = (ringColors) => {
  const toleranceColors = ringColors.filter(color => color.tolerance !== null)
  return toleranceColors
}

export const calculateOhmValue: (firstFigure: number, secondFigure: number, multiplier: number, tolerance: number) => string =
(firstFigure, secondFigure, multiplier, tolerance) => {
  const concatenatedStrings = firstFigure.toString() + secondFigure.toString()
  const twoFiguresNumber = parseInt(concatenatedStrings)
  return `${twoFiguresNumber * multiplier} Ω ± ${tolerance}%`
}