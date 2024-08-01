import * as process from 'node:process';
import { registerAs } from '@nestjs/config';

export default registerAs('mongoDb', () => ({
    uri: process.env.MONGODB_URI || 'mongodb://localhost',
    dbName: process.env.MONGODB_NAME || 'crowdCue',
}));
