console.log("hello from main");

const { app, BrowserWindow } = require("electron");
const debug = require("debug");
const log = debug("main");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

main();
