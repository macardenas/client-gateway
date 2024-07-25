import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [OrdersModule],//ProductsModule,
  controllers: [],
  providers: [],
})
export class AppModule {}
