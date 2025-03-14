import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NatsModule } from 'src/tranports/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports:[NatsModule]
})
export class OrdersModule {}
