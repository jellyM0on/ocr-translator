const { app, BrowserWindow, globalShortcut, desktopCapturer, ipcMain, screen } = require('electron')
let path = require('path')

let selected; 
function handleSelected(event, source){
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  selected = JSON.parse(source)
}

let win; 
const createWindow = () => {
        win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: true,
          enableRemoteModule: true,
          preload: path.join(__dirname, 'preload.js')

        }
    })
  win.loadFile('index.html')

  //get sources 
  desktopCapturer.getSources({types: ['window', 'screen' ]})
  .then(async sources => {
    win.webContents.send('SET_SOURCES', sources)
})
  
}


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
      globalShortcut.unregisterAll(); 
      app.quit()
    } 
  })

app.on('will-quit', () => {
  globalShortcut.unregisterAll(); 
})

app.whenReady().then(() => {
    createWindow()
    ipcMain.on('set-selected', handleSelected)
    const ret = globalShortcut.register('CommandOrControl+X', () => {
      console.log("keyboard press"); 
      if(selected != undefined){
        // capture(selected)
      }
    })

    if(!ret){
      console.log("none")
    }

    console.log(globalShortcut.isRegistered('CommandOrControl+X'))
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

//screenshot

