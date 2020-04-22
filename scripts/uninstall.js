const fs = require("fs");
const { confPath } = require("../lib/prefsManager");

const path = confPath().replace("prefs.json", "");

try {
  path && fs.rmdirSync(path, { recursive: true });
} catch (error) {}
