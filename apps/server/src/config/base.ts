import * as process from 'node:process';
import { registerAs } from '@nestjs/config';

export default registerAs('', () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_ENV || 'development',
}));
