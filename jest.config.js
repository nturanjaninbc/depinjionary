module.exports = {
  rootDir: 'test',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@application/(.*)': '<rootDir>/../src/application/$1',
    '^@config/(.*)': '<rootDir>/../src/config/$1',
    '^@container/(.*)': '<rootDir>/../src/container/$1',
  },
  setupFiles: ["../jest-setup-file.ts"]
};
