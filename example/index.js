const path = require("path");

const CliSiTef = require("../src/cli-sitef");
const config = require("./config");

// Cria o objeto do SiTef
const dllPath = path.resolve(__dirname, "bin", "libclisitef.so");
const sitef = new CliSiTef(dllPath);

const main = async () => {
  // ...
};

main().then(process.exit);
