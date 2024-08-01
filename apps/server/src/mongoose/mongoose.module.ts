import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('mongoDb.uri'),
                dbName: configService.get<string>('mongoDb.dbName'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class MongooseConnectionModule {}
