import { remote } from 'electron'
import path from 'path'
import fs from 'fs'
import os from 'os'

export function saveFileBackupCostumers(costumers = []) {
  const date = new Date()

  const dateParse = date.toLocaleDateString().replace(' ', '')

  remote.dialog
    .showSaveDialog({
      title: 'Salvar',
      defaultPath: path.join(os.homedir + dateParse + 'backup.json'),
      buttonLabel: 'Salvar',
      filters: [{ name: 'Backups', extensions: ['txt', 'json'] }]
    })
    .then(file => {
      if (!file.canceled) {
        console.log(file.filePath.toString())

        // Creating and Writing to the sample.txt file
        fs.writeFile(
          file.filePath.toString(),
          'This is a Sample File',
          function (err) {
            if (err) throw err
            console.log('Saved!')
          }
        )
      }
    })
    .catch(err => console.log('err file', err))
}
