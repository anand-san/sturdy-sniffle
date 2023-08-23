import { parse } from 'csv-parse'
import { possibleTable } from './utils'
import { rotateTableLeft } from './rotate-table'
import fs from 'fs'

const main = () => {
  try {
    const csvPath = process.argv[2]

    if (!csvPath) throw 'no file path provided'

    if (!csvPath.includes('.csv')) throw 'invalid file'

    fs.createReadStream(csvPath)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', function (row: string[]) {
        const index = row[0]
        const originalTable = row[1]
        const originalTableObject = JSON.parse(originalTable) as number[]
        const isRotationPossible = possibleTable(originalTableObject.length)

        const rotatedTable = rotateTableLeft({ table: originalTableObject })

        console.log(
          `${index}, ${JSON.stringify(rotatedTable)}, ${isRotationPossible}`
        )
      })
      .on('end', function () {
        // console.log('There you go')
      })
      .on('error', function (error: Error) {
        console.log('Error', error.message)
      })
  } catch (e) {
    console.log(e)
  }
}

main()
