import * as process from 'node:process';
import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    secret: process.env.AUTH_SECRET || 'secret',
    adminToken: process.env.AUTH_ADMIN_TOKEN,
}));
