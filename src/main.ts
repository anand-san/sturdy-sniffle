import { parse } from 'csv-parse'
import { possibleTable } from './utils'
import { rotateTableLeft } from './rotate-table'
import fs from 'fs'

const main = () => {
  try {
    const csvPath = process.argv[2]

    if (!csvPath) throw 'no file path provided'

    if (!csvPath.includes('.csv'))
      throw 'I only understand csv files, did you miss adding the .csv file extension at the end of input?'

    if (!fs.existsSync(csvPath)) throw 'file not found'

    fs.createReadStream(csvPath)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', function (row: string[]) {
        const index = row[0]
        const originalTable = row[1]
        let originalTableObject: number[] = []
        try {
          originalTableObject = JSON.parse(originalTable) as number[]
        } catch {
          // Invalid List
          console.log(`${index}, [], false`)
        }
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
