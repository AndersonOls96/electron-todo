const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindow)

ipcMain.handle('salvar-tarefas', async(event, tarefas) =>{
    const userDataPath = app.getPath('userData')
    const filePath = path.join(userDataPath, 'tarefas.json')

    try{
        fs.writeFileSync(filePath, JSON.stringify(tarefas, null, 2))
        return { sucess: true }
    }catch (error){
        return { sucess: false, error: error.message}
    }
})

ipcMain.handle('carregar-tarefas', async ()=>{
    const userDataPath = app.getPath('userData')
    const filePath = patj.join(userDataPath, 'tarefas.json')

    try{
        if(fs.existsSync(filePath)){
            const data = fs.readFileSync(filePath, 'utf-8')
            return JSON.parse(data)
        }
        return []
    }
    catch(error){
        return [];
    }
})