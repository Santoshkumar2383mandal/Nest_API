import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { User } from './auth/user.entity';
import { Item } from './item/item.entity';
import { AppController } from './app.controller';

/**
 * App Module
 * Root module - configures database and imports feature modules
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true, // WARNING: disable in production!
      entities: [User, Item],
    }),

    AuthModule,
    ItemModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
