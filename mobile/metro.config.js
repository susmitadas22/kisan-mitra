const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig();

config.resolver.unstable_enablePackageExports = true;

module.exports = config;
