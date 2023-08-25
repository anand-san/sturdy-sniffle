export const createTable = (length: number): number[] =>
  Array.from({ length }, () => Math.floor(Math.random() * length))

export const createTableSequence = (length: number): number[] =>
  Array.from({ length }, (_, index) => index)

const isWholeNumber = (number: number): boolean => {
  return number % 1 === 0
}

export const possibleTable = (totalTableElements: number): boolean => {
  const rowsAndColumnsLength = Math.sqrt(totalTableElements)
  const areRowsAndColumnsEqual = isWholeNumber(rowsAndColumnsLength)

  if (!areRowsAndColumnsEqual) return false
  return true
}

export const getValuesFromIndexes = (
  tableIndexes: number[],
  originalTable: number[]
) => {
  return Array.from({ length: tableIndexes.length }, (_, index) => {
    const unmovedIndexValue = tableIndexes[index]
    return originalTable[unmovedIndexValue]
  })
}
