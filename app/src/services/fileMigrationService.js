// service to handle importing and exporting of user data.
import { getJSON } from './jsonDatabaseService'
const { dialog, app } = require('electron').remote
const fs = require('fs')

// function to handle internal save operation
const saveDialog = (fileName, options) => {
    // 1 - get the related user data:
    const userData = getJSON(fileName)

    // 2 - make an object out of it, set the object key same as fileName:
    const output = {
        [fileName]: userData
    }

    // 3 - convert it from object to JSON string to make it ready for saving:
    const outputData = JSON.stringify(output)

    // 4 - open the save dialog & then save it:

    dialog.showSaveDialog(null, options)
        .then(() => fs.writeFile(options.defaultPath, outputData, (err) => {
            if (err) return dialog.showErrorBox('Error', 'Exporting was unsuccessful. Please try again.')
            // if successful, show dialog box
            // return dialog.showMessageBox({
            //     type: 'info',
            //     title: 'Success',
            //     message: `Successfully exported ${fileName}.json`
            // })
            // Success dialog can be in app instead of system message
            return console.log(`Successfully exported ${fileName}.json`)
        }))
}

// service function to recieve file name and defining configs
export const openExport = (name) => {
    const options = {
        title: 'Export your data...',
        defaultPath: app.getPath('desktop') + `/${name}.json`,
        buttonLabel: 'Save it',
        filters: [
      {name: 'JSON Files', extensions: ['json']}
     ]
    }

    saveDialog(name, options)
}