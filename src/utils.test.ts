import { possibleTable } from './utils'

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
