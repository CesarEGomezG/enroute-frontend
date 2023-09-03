import type { Config } from 'tailwindcss'
import { incompleteRingColors } from './src/utils/ringColors'

const ringColors = incompleteRingColors.reduce((acc, color) => {
  acc[`rg_${color.name}`] = color.hex
  return acc
}, {} as Record<string, string>)

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        ...ringColors
      }
    },
  },
  plugins: [],
}
export default config
