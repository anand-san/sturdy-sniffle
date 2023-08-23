import { possibleTable } from './utils'

type RotateTableProps = {
  table: number[]
}

export const rotateTableLeft = ({ table }: RotateTableProps): number[] => {
  const totalElements = table.length

  if (!possibleTable(totalElements))
    throw new Error('rotation not possible, rows and columns are not equal')

  const tableSize = Math.sqrt(totalElements)
  let prevLeftElementValue = -1

  for (let i = tableSize; i < totalElements; i += tableSize) {
    const firstIteration = prevLeftElementValue === -1
    const lastIteration = i === totalElements - tableSize
    const currentRightElementIndex = i - 1

    const currentLeftElementIndex = i
    const currentLeftElementValue = table[currentLeftElementIndex]

    const nextRightElementValue = table[currentRightElementIndex + tableSize]

    const nextLeftElementValue =
      prevLeftElementValue !== -1
        ? prevLeftElementValue
        : table[currentLeftElementIndex - tableSize]

    if (firstIteration) {
      table.shift()
      table.splice(currentRightElementIndex, 0, nextRightElementValue)
    }

    table.splice(currentLeftElementIndex, 1, nextLeftElementValue)
    table.splice(currentRightElementIndex, 1, nextRightElementValue)

    if (lastIteration) {
      table.splice(currentLeftElementIndex + 1, 0, currentLeftElementValue)
      table.pop()
    }

    prevLeftElementValue = currentLeftElementValue
  }
  return table
}
