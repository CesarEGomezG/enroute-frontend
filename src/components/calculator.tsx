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
    <div className="flex flex-col justify-center">
      <div className="bg-enroute_gray rounded-md px-6 py-4 inline-block self-center text-black">
        <div className="grid grid-cols-2 gap-3">
          <p className="self-center">First figure color:</p>
          <ColorSelect colors={state.colors.figures} selectColor={(colorId: number) => selectColor({ firstFigure: colorId })} />
          <p className="self-center">Second figure color:</p>
          <ColorSelect colors={state.colors.figures} selectColor={(colorId: number) => selectColor({ secondFigure: colorId })} />
          <p className="self-center">Multiplier color:</p>
          <ColorSelect colors={state.colors.multiplier} selectColor={(colorId: number) => selectColor({ multiplier: colorId })} />
          <p className="self-center">Tolerance color:</p>
          <ColorSelect colors={state.colors.tolerance} selectColor={(colorId: number) => selectColor({ tolerance: colorId })} />
        </div>
        <button className="bg-enroute_yellow px-6 py-3 rounded-sm w-full mt-3" onClick={calculateValue}>Calculate value</button>
      </div>
      <p className="text-center pt-6 pb-2">The value is:</p>
      <p className="text-center text-xl font-bold">{state.ohmValue}</p>
    </div>
  )
}

export default ColorCalculator