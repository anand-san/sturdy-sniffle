export const createTable = (length: number): number[] =>
  Array.from({ length }, () => Math.floor(Math.random() * length))

const isWholeNumber = (number: number): boolean => {
  return number % 1 === 0
}

export const possibleTable = (totalTableElements: number): boolean => {
  const rowsAndColumnsLength = Math.sqrt(totalTableElements)
  const areRowsAndColumnsEqual = isWholeNumber(rowsAndColumnsLength)

  if (!areRowsAndColumnsEqual) return false
  return true
}

export const prettyPrintTable = (table: number[]): void => {
  const totalTableElements = table.length
  const rowsAndColumnsLength = Math.sqrt(totalTableElements)

  let string = ''
  for (let i = 0; i <= totalTableElements; i++) {
    if (i % rowsAndColumnsLength === 0) {
      console.log(string)
      string = ''
    }

    string += ` ${table[i]}`
  }
}
