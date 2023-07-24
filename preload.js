const { ipcRenderer, contextBridge } = require('electron')

let allSources;
let selectedSource; 

ipcRenderer.on('SET_SOURCES', async (event, sources) => {
    try {
     allSources = sources; 
    } catch (e) {
      console.log(e);
    }
  })

contextBridge.exposeInMainWorld('sources', {
    srcs: () => { return allSources }, 
    src: (s) => ipcRenderer.send('SET_SOURCE', s), 
    
  })