import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  platform: process.platform,

  showOpenDialog: (opts: Electron.OpenDialogOptions) => ipcRenderer.invoke("dialog:open", opts),
  showSaveDialog: (opts: Electron.SaveDialogOptions) => ipcRenderer.invoke("dialog:save", opts),

  readFile: (path: string) => ipcRenderer.invoke("fs:read", path),
  writeFile: (path: string, data: string) => ipcRenderer.invoke("fs:write", path, data),

  openExternal: (url: string) => ipcRenderer.invoke("shell:open-external", url),

  showNotification: (title: string, body: string) =>
    ipcRenderer.invoke("notification:show", title, body),

  minimize: () => ipcRenderer.invoke("window:minimize"),
  maximize: () => ipcRenderer.invoke("window:maximize"),
  close: () => ipcRenderer.invoke("window:close"),
});
