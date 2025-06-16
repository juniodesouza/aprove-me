import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  globals: {
    NODE_ENV: 'test',
  },
  globalSetup: '<rootDir>/jest-global-setup.ts',
  setupFiles: ['<rootDir>/jest-setup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  coveragePathIgnorePatterns: [
    '/__tests__/',
    '<rootDir>/node_modules/',
    '<rootDir>/prisma/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/jest.*',
    '<rootDir>/.eslintrc.js',
    '<rootDir>/src/healt',
    '<rootDir>/src/global-config.ts',
    '<rootDir>/src/app.module.ts',
    '<rootDir>/src/main.ts',
    '<rootDir>/src/shared/infrastructure/docs/',
    '<rootDir>/src/shared/infrastructure/database/',
    '\\module\\.ts$',
    '\\.module\\.ts$',
    '\\.doc\\.ts$',
    '\\.dto\\.ts$',
  ],
}
