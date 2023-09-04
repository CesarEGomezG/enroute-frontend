import { getCompleteRingColors, getSignificantFigureColors, getMultiplierColors, getToleranceColors, calculateOhmValue } from "@/utils/ringColors"
import databaseColors from "../../src/mocks/databaseColors"

describe('Obtención de listas de colores + Conexión con API', () => {

  test('Conexión con API + Obtener colores completos con datos de la API', async () => {
    const ringColors = await getCompleteRingColors()
    expect(ringColors.length).toBe(13)
    expect(ringColors).toEqual(databaseColors)
  })
  
  test('Filtrar colores para digitos', () => {
    const figureColors = getSignificantFigureColors()
    const numberOfColorsWithoutDigit: number = figureColors.reduce((count, currentColor) => {
      if (typeof currentColor.figure === 'number') return count
      else return count + 1
    }, 0)
    expect(figureColors.length).toBe(10)
    expect(numberOfColorsWithoutDigit).toBe(0)
  })
  
  test('Filtrar colores para multiplicador', async () => {
    const ringColors = await getCompleteRingColors()
    const multiplierColors = getMultiplierColors(ringColors)
    expect(multiplierColors.length).toBe(13)
  })
  
  test('Filtar colores para tolerancia', async () => {
    const ringColors = await getCompleteRingColors()
    const toleranceColors = getToleranceColors(ringColors)
    const numberOfColorsWithoutTolerance: number = toleranceColors.reduce((count, currentColor) => {
      if (typeof currentColor.tolerance === 'number') return count
      else return count + 1
    }, 0)
    expect(toleranceColors.length).toBe(10)
    expect(numberOfColorsWithoutTolerance).toBe(0)
  })
})

describe('Cálculo de valores de Ohms con la función calculadora', () => {
  test('Azul, rojo, violeta, amarillo', async () => {
    const ringColors = await getCompleteRingColors()
    const figureColors = getSignificantFigureColors()
    const multiplierColors = getMultiplierColors(ringColors)
    const toleranceColors = getToleranceColors(ringColors)

    const firstColor = figureColors.find((color) => color.name === 'blue')
    const secondColor = figureColors.find((color) => color.name === 'red')
    const thirdColor = multiplierColors.find((color) => color.name === 'violet')
    const fourthColor = toleranceColors.find((color) => color.name === 'yellow')

    const value = calculateOhmValue(firstColor?.figure!, secondColor?.figure!, thirdColor?.multiplier!, fourthColor?.tolerance!)
    expect(value).toBe('620000000 Ω ± 0.02%')
  })

  test('Gris, violeta, café, verde', async () => {
    const ringColors = await getCompleteRingColors()
    const figureColors = getSignificantFigureColors()
    const multiplierColors = getMultiplierColors(ringColors)
    const toleranceColors = getToleranceColors(ringColors)

    const firstColor = figureColors.find((color) => color.name === 'gray')
    const secondColor = figureColors.find((color) => color.name === 'violet')
    const thirdColor = multiplierColors.find((color) => color.name === 'brown')
    const fourthColor = toleranceColors.find((color) => color.name === 'green')

    const value = calculateOhmValue(firstColor?.figure!, secondColor?.figure!, thirdColor?.multiplier!, fourthColor?.tolerance!)
    expect(value).toBe('870 Ω ± 0.5%')
  })

  test('Naranja, blanco, rosa, naranja', async () => {
    const ringColors = await getCompleteRingColors()
    const figureColors = getSignificantFigureColors()
    const multiplierColors = getMultiplierColors(ringColors)
    const toleranceColors = getToleranceColors(ringColors)

    const firstColor = figureColors.find((color) => color.name === 'orange')
    const secondColor = figureColors.find((color) => color.name === 'white')
    const thirdColor = multiplierColors.find((color) => color.name === 'pink')
    const fourthColor = toleranceColors.find((color) => color.name === 'orange')

    const value = calculateOhmValue(firstColor?.figure!, secondColor?.figure!, thirdColor?.multiplier!, fourthColor?.tolerance!)
    expect(value).toBe('0.039 Ω ± 0.05%')
  })
})