process.env.VUE_APP_NAME = require("./package.json").name;
process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_TYPESCRIPT_VERSION = require("./package-lock.json").dependencies.typescript.version;

module.exports = {
    publicPath: "./",
};