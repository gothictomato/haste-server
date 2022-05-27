import * as fs from 'fs'
import { Config } from '../../types/config'

const getConfig = (): Config => {
  const configPath = process.argv.length <= 2 ? 'config.json' : process.argv[2]
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

  config.port = (process.env.PORT || config.port || 7777) as number
  config.host = process.env.HOST || config.host || 'localhost'

  if (!config.storage) {
    config.storage = { type: 'file' }
  }
  if (!config.storage.type) {
    config.storage.type = 'file'
  }

  return config
}

export default getConfig