'use client'

import { useCallback, useEffect, useState } from "react"
import ColorSelect from "./colorSelector"
import { getCompleteRingColors, getMultiplierColors, getSignificantFigureColors, getToleranceColors, incompleteColor, ringColor } from "@/utils/ringColors"

const ColorCalculator = () => {
  const [ state, setState ] = useState<{
    colors: {
      figures: incompleteColor[], multiplier: ringColor[], tolerance: ringColor[]
    },
    load: {
      colorValues: boolean
    }
  }>({
    colors: {
      figures: [], multiplier: [], tolerance: []
    },
    load: {
      colorValues: false
    }
  })

  const loadColorValues = useCallback( async (): Promise<void> => {
    const allRingColors = await getCompleteRingColors()
    const figuresColors = getSignificantFigureColors()
    const multiplierColors = getMultiplierColors(allRingColors)
    const toleranceColors = getToleranceColors(allRingColors)
    setState({
      ...state,
      colors: {
        figures: figuresColors, multiplier: multiplierColors, tolerance: toleranceColors
      },
      load: {
        ...state.load,
        colorValues: true
      }
    })
  }, [state] )

  useEffect(() => {
    if(state.load.colorValues === false) loadColorValues()
  }, [state.load.colorValues, loadColorValues])

  return (
    <div>
      <div>
        <ColorSelect colors={state.colors.figures} />
        <ColorSelect colors={state.colors.figures} />
        <ColorSelect colors={state.colors.multiplier} />
        <ColorSelect colors={state.colors.tolerance} />
      </div>
    </div>
  )
}

export default ColorCalculator