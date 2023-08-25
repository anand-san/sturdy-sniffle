import { possibleTable, createTableSequence } from './utils'

type RotateTableProps = {
  currentTable: number[]
  parentTable?: number[]
  parentTableCurrentlyRotatingIndexes?: number[]
}

export const rotateTableLeft = ({
  currentTable,
  parentTable = [],
  parentTableCurrentlyRotatingIndexes = []
}: RotateTableProps): number[] => {
  const totalElements = currentTable.length

  if (!possibleTable(totalElements)) return []

  const tableSize = Math.sqrt(totalElements)
  const tableIndexesUnmoved = createTableSequence(totalElements)

  // remove top and bottom column elements affected by rotation
  tableIndexesUnmoved.splice(0, tableSize - 1)
  tableIndexesUnmoved.splice(-(tableSize - 1))

  let prevLeftElementValue = -1

  for (let i = tableSize; i < totalElements; i += tableSize) {
    const firstIteration = prevLeftElementValue === -1
    const lastIteration = i === totalElements - tableSize
    const currentRightElementIndex = i - 1

    const currentLeftElementIndex = i
    const currentLeftElementValue = currentTable[currentLeftElementIndex]

    const nextRightElementValue =
      currentTable[currentRightElementIndex + tableSize]

    const nextLeftElementValue =
      prevLeftElementValue !== -1
        ? prevLeftElementValue
        : currentTable[currentLeftElementIndex - tableSize]

    if (firstIteration) {
      currentTable.shift()
      currentTable.splice(currentRightElementIndex, 0, nextRightElementValue)
    }

    currentTable.splice(currentLeftElementIndex, 1, nextLeftElementValue)
    currentTable.splice(currentRightElementIndex, 1, nextRightElementValue)

    if (lastIteration) {
      currentTable.splice(
        currentLeftElementIndex + 1,
        0,
        currentLeftElementValue
      )
      currentTable.pop()
    }

    // remove the element from unmoved list
    tableIndexesUnmoved.splice(
      tableIndexesUnmoved.indexOf(currentRightElementIndex),
      2
    )

    prevLeftElementValue = currentLeftElementValue
  }

  if (!parentTable.length) parentTable = [...currentTable]
  else {
    // replace parent table with inner table rotated values
    parentTableCurrentlyRotatingIndexes.forEach((e, i) => {
      parentTable[e] = currentTable[i]
    })
  }

  if (tableIndexesUnmoved.length >= 4) {
    const innerTable = getValuesFromIndexes(tableIndexesUnmoved, currentTable)
    return rotateTableLeft({
      currentTable: innerTable,
      parentTable: parentTable || currentTable,
      parentTableCurrentlyRotatingIndexes: tableIndexesUnmoved
    })
  } else {
    return parentTable
  }
}

const getValuesFromIndexes = (
  tableIndexes: number[],
  originalTable: number[]
) => {
  return Array.from({ length: tableIndexes.length }, (_, index) => {
    const unmovedIndexValue = tableIndexes[index]
    return originalTable[unmovedIndexValue]
  })
}
