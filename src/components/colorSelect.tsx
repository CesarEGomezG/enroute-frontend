'use client'

import { incompleteColor } from "@/utils/ringColors"
import { ChangeEvent } from "react"

interface ColorSelectProps {
  colors: incompleteColor[],
  selectColor: (colorId: number) => void
}

const ColorSelect = ({ colors, selectColor }: ColorSelectProps) => {
  const selectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    selectColor( parseInt(event.target.value) )
  }

  return (
    <select onChange={selectValue}>
      {
        colors.map((color) => {
          return (
            <option key={color.id} value={color.id}>{color.name}</option>
          )
        })
      }
    </select>
  )
}

export default ColorSelect