import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './tranports/nats.module';

@Module({
  imports: [OrdersModule,ProductsModule, NatsModule],//ProductsModule,
  controllers: [],
  providers: [],
})
export class AppModule {}
