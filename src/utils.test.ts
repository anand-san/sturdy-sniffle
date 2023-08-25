import { getValuesFromIndexes, possibleTable } from './utils'

describe('possibleTable', () => {
  it.each([
    [11, false],
    [16, true],
    [24, false],
    [36, true],
    [144, true]
  ])(
    'checks if table size is %j then it is possible to have a table',
    (input, expected) => {
      expect(possibleTable(input)).toEqual(expected)
    }
  )
})

describe('getValuesFromIndexes', () => {
  it('return correct values from array with the indexes provided', () => {
    expect(getValuesFromIndexes([4, 3], [9, 7, 4, 3, 2, 0])).toEqual([2, 3])
  })
})
