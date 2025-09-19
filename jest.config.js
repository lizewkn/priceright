module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock problematic modules
    '^cheerio$': '<rootDir>/src/__mocks__/cheerio.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(cheerio|undici)/)'
  ]
};