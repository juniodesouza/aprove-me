import baseConfig from './jest.config'

export default {
  ...baseConfig,
  testRegex: '.*\\.int\\.spec\\.ts$',
}
