const debug = require("debug");
const log = debug("python");
const { asyncPython } = require("python-wasm");

let python = null;

// todo: reuseInFlight...?
async function getPython() {
  if (python == null) {
    python = await asyncPython();
  }
  return python;
}

async function repr(s) {
  const p = await getPython();
  return await p.repr(s);
}

async function exec(s) {
  const p = await getPython();
  await p.exec(s);
}

async function version() {
  log("pythonVersion: getting...");
  await exec("import sys");
  return await repr("sys.version");
}

exports.version = version;
exports.repr = repr;
exports.exec = exec;
