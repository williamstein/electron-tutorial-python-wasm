const log = console.log;

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  pythonVersion: () => ipcRenderer.invoke("python:version"),
  pythonExec: (s) => ipcRenderer.invoke("python:exec", s),
  pythonRepr: (s) => ipcRenderer.invoke("python:repr", s),
});

const replaceText = (selector, text) => {
  log("replaceText", { selector, text });
  const element = document.getElementById(selector);
  if (element) {
    element.innerText = text;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  log("DOMContentLoaded, so now do deps");
  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
