'use client'

import { useCallback, useEffect, useState } from "react"
import ColorSelect from "./colorSelect"
import { calculateOhmValue, getCompleteRingColors, getMultiplierColors, getSignificantFigureColors, getToleranceColors, incompleteColor, ringColor } from "@/utils/ringColors"

export type State = {
  colors: {
    figures: incompleteColor[], multiplier: ringColor[], tolerance: ringColor[]
  },
  values: { firstFigure: number, secondFigure: number, multiplier: number, tolerance: number },
  load: {
    colorValues: boolean
  },
  ohmValue: string
}

const defaultState: State = {
  colors: {
    figures: [], multiplier: [], tolerance: []
  },
  values: { firstFigure: -1, secondFigure: -1, multiplier: -1, tolerance: -1 },
  load: {
    colorValues: false
  },
  ohmValue: ''
}

const ColorCalculator = () => {
  const [ state, setState ] = useState<State>(defaultState)

  const loadColorValues = useCallback( async (): Promise<void> => {
    const allRingColors = await getCompleteRingColors()
    console.log(allRingColors)
    const figuresColors = getSignificantFigureColors()
    const multiplierColors = getMultiplierColors(allRingColors)
    const toleranceColors = getToleranceColors(allRingColors)
    setState({
      ...state,
      colors: {
        figures: figuresColors, multiplier: multiplierColors, tolerance: toleranceColors
      },
      values: { firstFigure: figuresColors[0].id, secondFigure: figuresColors[0].id, multiplier: multiplierColors[0].id, tolerance: toleranceColors[0].id },
      load: {
        ...state.load,
        colorValues: true
      }
    })
  }, [state] )

  const selectColor = (newValues: Partial<State['values']>) => {
    setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        ...newValues
      }
    }))
  }

  const calculateValue = () => {

    // Encontrar las posiciones de los colores seleccionados en la listas de colores con base en su id
    const firstFigureIndex = state.colors.figures.findIndex(color => color.id === state.values.firstFigure)
    const secondFigureIndex = state.colors.figures.findIndex(color => color.id === state.values.secondFigure)
    const multiplierIndex = state.colors.multiplier.findIndex(color => color.id === state.values.multiplier)
    const toleranceIndex = state.colors.tolerance.findIndex(color => color.id === state.values.tolerance)

    const allPositionsMet = firstFigureIndex !== -1 && secondFigureIndex !== -1 && multiplierIndex !== -1 && toleranceIndex !== -1
    if (allPositionsMet) {

      // Obtener los colores seleccionados con su posición en la listas de colores
      const firstFigure = state.colors.figures[firstFigureIndex]
      const secondFigure = state.colors.figures[secondFigureIndex]
      const multiplier = state.colors.multiplier[multiplierIndex]
      const tolerance = state.colors.tolerance[toleranceIndex]

      const validColorsSelected = typeof firstFigure.figure !== 'undefined' && typeof secondFigure.figure !== 'undefined' && tolerance.tolerance !== null
      if (validColorsSelected) {

        // Pongo los signos de admiración de TypeScript para decirle al compilador que estoy completamente seguro de que esos
        // valores no son undefined ni null debido a que ya hice la comprobación de eso en la condición 'validColorsSelected'
        const ohmValue = calculateOhmValue(firstFigure.figure!, secondFigure.figure!, multiplier.multiplier, tolerance.tolerance!)
        setState((prevState) => ({
          ...prevState, ohmValue
        }))
      } else console.error('validColorsSelected === false')
    } else console.error('allPositionsMet === false')
  }

  useEffect(() => {
    if(state.load.colorValues === false) loadColorValues()
  }, [state.load.colorValues, loadColorValues])

  return (
    <div className="border border-1 border-black rounded-md">
      <p>Select the colors</p>
      <div className="flex flex-row w-full justify-center">
        <ColorSelect label='First figure' colors={state.colors.figures} selectColor={(colorId: number) => selectColor({ firstFigure: colorId })} />
        <ColorSelect label='Second figure' colors={state.colors.figures} selectColor={(colorId: number) => selectColor({ secondFigure: colorId })} />
        <ColorSelect label='Multiplier' colors={state.colors.multiplier} selectColor={(colorId: number) => selectColor({ multiplier: colorId })} />
        <ColorSelect label='Tolerance' colors={state.colors.tolerance} selectColor={(colorId: number) => selectColor({ tolerance: colorId })} />
      </div>
      <button onClick={calculateValue}>Calculate</button>
      <p>The value is {state.ohmValue}</p>
    </div>
  )
}

export default ColorCalculator