'use client'

import { incompleteColor } from "@/utils/ringColors"
import { ChangeEvent, useEffect, useState } from "react"
import "./colorSelect.css"

interface ColorSelectProps {
  label: string,
  colors: incompleteColor[],
  selectColor: (colorId: number) => void
}

const ColorSelect = ({ label, colors, selectColor }: ColorSelectProps) => {
  const [state, setState] = useState<{ color: string, colorsLoaded: boolean }>({ color: '', colorsLoaded: false })
  
  const selectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.options[event.target.selectedIndex]
    const selectedName = selectedOption.textContent
    const selectedBackgroundColor = `bg-rg_${selectedName}`
    console.log(selectedBackgroundColor)
    setState({...state, color: selectedBackgroundColor})
    selectColor( parseInt(event.target.value) )
  }

  useEffect(() => {
    if (state.colorsLoaded === false && colors.length > 0) {
      setState({...state, colorsLoaded: true, color: `bg-rg_${colors[0].name}`})
    }
  }, [state, colors])

  return (
    <div className="flex border border-black p-1">
      <p>{label}</p>
      <select className={`seleccionarColor ${state.color}`} onChange={selectValue}>
        {
          colors.map((color) => {
            return (
              <option key={color.id} value={color.id}>{color.name}</option>
            )
          })
        }
      </select>
    </div>
  )
}

export default ColorSelect