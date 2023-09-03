import { getCompleteRingColors, getSignificantFigureColors, getMultiplierColors, getToleranceColors, calculateOhmValue } from "@/utils/ringColors"
import databaseColors from "../../src/mocks/databaseColors"

test('Conexión con API + Obtener colores completos con datos de la API', async () => {
  const ringColors = await getCompleteRingColors()
  expect(ringColors.length).toBe(13)
  expect(ringColors).toEqual(databaseColors)
})

test('Filtrar colores para digitos', () => {
  const figureColors = getSignificantFigureColors()
  expect(figureColors.length).toBe(10)
})

test('Filtrar colores para multiplicador', async () => {
  const ringColors = await getCompleteRingColors()
  const multiplierColors = getMultiplierColors(ringColors)
  expect(multiplierColors.length).toBe(13)
})

test('Filtar colores para tolerancia', async () => {
  const ringColors = await getCompleteRingColors()
  const toleranceColors = getToleranceColors(ringColors)
  expect(toleranceColors.length).toBe(10)
})