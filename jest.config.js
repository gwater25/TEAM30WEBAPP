module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/components', '<rootDir>/services', '<rootDir>/__tests__'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
