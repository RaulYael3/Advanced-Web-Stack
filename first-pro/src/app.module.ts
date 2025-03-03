import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'jajaj1234jajaj',
      database: process.env.DATABASE_NAME || 'ocso_db',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeesModule,
    ProductsModule,
    ProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
