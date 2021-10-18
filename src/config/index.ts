import { commonConfig } from './common'
import { prodConfig } from './prod'
import { devConfig } from './dev'
import { IConfig } from '../types/config/config.types'
let config: Partial<IConfig> = {}
if (process.env.NODE_ENV === 'production') {
    config = { ...commonConfig, ...prodConfig }
} else {
    config = { ...commonConfig, ...devConfig }
}
export default config
