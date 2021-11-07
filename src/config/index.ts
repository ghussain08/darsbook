import { commonConfig } from './common';
import { prodConfig } from './prod';
import { devConfig } from './dev';
let config: Partial<IConfig> = {};
if (process.env.NODE_ENV === 'production') {
    config = { ...commonConfig, ...prodConfig };
} else {
    config = { ...commonConfig, ...devConfig };
}
export default config;

export interface IConfig {
    brandName: string;
    baseUrl: string;
}
