'use client'

import { incompleteColor } from "@/utils/ringColors"
import { ChangeEvent } from "react"

interface ColorSelectProps {
  label: string,
  colors: incompleteColor[],
  selectColor: (colorId: number) => void
}

const ColorSelect = ({ label, colors, selectColor }: ColorSelectProps) => {
  const selectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    selectColor( parseInt(event.target.value) )
  }

  return (
    <div className='color'>
      <p>{label}</p>
      <select onChange={selectValue}>
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