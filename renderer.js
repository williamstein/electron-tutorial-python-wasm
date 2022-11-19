console.log("need to figure out python...");

async function main() {
  const v = await window.electronAPI.pythonVersion();
  console.log("ver = ", v);
  document.getElementById("python-version").innerText = v.slice(1,-1);

  const t0 = new Date().valueOf();
  await window.electronAPI.pythonExec(`
import pandas, json, os, sys
from contextlib import redirect_stdout
import io
f = io.StringIO()
with redirect_stdout(f):
    print("PYTHONHOME = ", os.environ.get('PYTHONHOME'))
    print("sys.path = ", sys.path)
    pandas.show_versions()
s = f.getvalue()
`);
  let pv = await window.electronAPI.pythonRepr("s");
  console.log(pv);
  pv = pv.split("\\n").join("\n").slice(1,-1);
  console.log(pv);
  pv = `Time to import pandas and get versions: ${new Date().valueOf() - t0}ms\n${pv}`;
  document.getElementById("pandas-versions").innerText = pv;
}

main();
