import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import Config from './configuration/Config';

@Module({
  imports: [
    ChatModule,
    ConfigModule.forRoot({
      load: [Config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
