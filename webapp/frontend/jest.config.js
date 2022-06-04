const config = {
    verbose: true,
    transform: { "\\.[jt]sx?$": "babel-jest" },
    testEnvironment: "jest-environment-jsdom",
};
  
module.exports = config;
