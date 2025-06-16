import baseConfig from './jest.config'

export default {
  ...baseConfig,
  testRegex: '.*\\.unit\\.spec\\.ts$',
}
