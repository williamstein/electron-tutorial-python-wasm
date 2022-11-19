console.log("hello from main");

const { app, BrowserWindow, ipcMain } = require("electron");
const { join } = require("path");
const debug = require("debug");
const log = debug("main");

const python = require("./python.js");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.on("window-all-closed", () => {
  log("window-all-closed");
  if (process.platform !== "darwin") {
    log("window-all-closed: actually quit");
    app.quit();
  }
});

async function main() {
  await app.whenReady();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.handle("python:version", python.version);
  ipcMain.handle(
    "python:exec",
    async (_, ...args) => await python.exec(...args)
  );
  ipcMain.handle(
    "python:repr",
    async (_, ...args) => await python.repr(...args)
  );

  createWindow();
}

main();
