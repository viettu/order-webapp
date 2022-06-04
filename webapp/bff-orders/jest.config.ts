export default {
  clearMocks: true,
  testEnvironment: "jest-environment-node",
  testMatch: [
    "**/__tests__/**/*.spec.ts"
  ],
  transform: {
    "\\.tsx?$": '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  transformIgnorePatterns: [ "/node_modules/" ]
};
