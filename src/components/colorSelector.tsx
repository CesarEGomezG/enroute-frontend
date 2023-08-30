'use client'

import { incompleteColor } from "@/utils/ringColors"
import { ReactNode } from "react"

interface ColorSelectProps {
  colors: incompleteColor[]
}

const ColorSelect = ({ colors }: ColorSelectProps) => {
  return (
    <select>
      {
        colors.map((color) => {
          return (
            <option key={color.id}>{color.name}</option>
          )
        })
      }
    </select>
  )
}

export default ColorSelect