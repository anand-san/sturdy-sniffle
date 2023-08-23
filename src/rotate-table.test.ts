import { rotateTableLeft } from './rotate-table'

describe('rotate table left', () => {
  const possibleRotations = [
    [[1], [1]],
    [
      [1, 2, 3, 4],
      [2, 4, 1, 3]
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 3, 6, 1, 5, 9, 4, 7, 8]
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      [2, 3, 4, 8, 1, 6, 7, 12, 5, 10, 11, 16, 9, 13, 14, 15]
    ]
  ]

  const impossibleRotations = [
    [[], []],
    [[14, 15, 16], []],
    [[14, 15, 16, 1, 2], []]
  ]
  it.each(possibleRotations)(
    'should rotate table outer elements anti clockwise once',
    (originalTable, rotatedTable) => {
      expect(rotateTableLeft({ table: originalTable })).toStrictEqual(
        rotatedTable
      )
    }
  )

  it.each(impossibleRotations)(
    'should return an empty array when rotation is not possible',
    (originalTable, rotatedTable) => {
      expect(rotateTableLeft({ table: originalTable })).toStrictEqual(
        rotatedTable
      )
    }
  )
})
