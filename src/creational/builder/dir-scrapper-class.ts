import fs from 'fs'

interface IFileReader {
  isJSONFile(file: string): boolean
  readText(filename: string): string
  readJson(filename: string): unknown
}

class DirectoryScrapper {
  constructor(public dirPath: string, public fileReader: IFileReader) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string): any => {
          if (this.fileReader.isJSONFile(file)) {
            acc[file] = this.fileReader.readJson(`${this.dirPath}/${file}}`)
          } else {
            acc[file] = this.fileReader.readText(file)
          }
        },
        {},
      )
  }
}

class FileReader implements IFileReader {
  isJSONFile(file: string): boolean {
    return file.endsWith('.json')
  }

  readText(filename: string): string {
    return fs.readFileSync(filename, 'utf-8').toString()
  }

  readJson(filename: string): unknown {
    return JSON.parse(fs.readFileSync(filename, 'utf-8'))
  }
}

const fileReader = new FileReader()
const dirScarper = new DirectoryScrapper('./data', fileReader)
const output = dirScarper.scanFiles()
console.log(output)
