const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',{
    salvarTarefas: (tarefas) => ipcRenderer.invoke('salvar-tarefas', tarefas),
    carregarTarefas: () => ipcRenderer.invoke('carregar-tarefas')
})