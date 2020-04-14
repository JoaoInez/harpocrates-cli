const signale = require("signale");

exports.signaleAbort = () => signale.fatal("Aborted!");
exports.signaleFatal = () => signale.fatal("Something went wrong!");
