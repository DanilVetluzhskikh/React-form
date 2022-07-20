const CracoAlias = require('craco-alias')

module.exports = { plugins: [
  {
    plugin: CracoAlias,
    baseUrl: '.',
    options: {
      source: 'tsconfig',
      baseUrl: '.',
      tsConfigPath: './tsconfig.paths.json'
    }
  }
] }
