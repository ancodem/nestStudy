import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    TopPageModule,
    ReviewModule,
    ProductModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://0.0.0.0:27017'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
