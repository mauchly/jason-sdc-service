module.exports = {
  // transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
  setupFiles: [
   "/Users/yingwenchen/Desktop/HR project/HR_RPT/FEC/FEC_Yingwen_service/jest.config.js"
  ],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
   "/node_modules/"],
 moduleFileExtensions: ["js", "json", "jsx", 'ts', 'tsx'],
 transformIgnorePatterns:["/Users/yingwenchen/Desktop/HR project/HR_RPT/FEC/FEC_Yingwen_service/client/src/*.jsx"]

 }