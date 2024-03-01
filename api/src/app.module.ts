import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { ChatModule } from './chat/chat.module';
import configuration from "./config/configuration";
import { Chat } from "./chat/chat.entity";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '../../.env',
        load: [configuration],
        isGlobal: true
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => ({
              type: 'mysql',
              host: config.get('database.host'),
              port: config.get('database.port'),
              database: config.get('database.name'),
              username: config.get('database.user'),
              password: config.get('database.password'),
              entities: [Chat],
              synchronize: true,
          })
      }),
      TypeOrmModule.forFeature([Chat]),
      ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
