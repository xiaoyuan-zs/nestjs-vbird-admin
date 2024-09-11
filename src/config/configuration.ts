import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'

const YAML_CONFIG_FILE = 'config.yaml'

// 导入默认配置文件
const filePath = join(__dirname, YAML_CONFIG_FILE)
// 导入对应环境的配置文件
const envFilePath = join(__dirname, `config.${process.env.NODE_ENV || 'development'}.yaml`)

const defaultConfig = yaml.load(readFileSync(filePath, 'utf8'))
const envConfig = yaml.load(readFileSync(envFilePath, 'utf8'))

// 合并配置
export default () => {
	return Object.assign(defaultConfig, envConfig)
}
