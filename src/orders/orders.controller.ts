import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, StatusDto } from './dto';
import { catchError } from 'rxjs';
import { OrderPaginationDTO } from './dto/order-pagination.dto';
import { paginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log("Voy a crear una orden")
    return this.client.send({ cmd:'createOrder'}, createOrderDto);
  }

  @Get()
  findAll(@Query() orderpaginationDTO: OrderPaginationDTO) {
    return this.client.send({ cmd: 'findAllOrders' }, orderpaginationDTO)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', id)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: paginationDto
  ) {
    return this.client.send('findAllOrders', {
      ...paginationDto,
      status: statusDto.status
    })
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
    return this.client.send('changestatus',{ id, status: statusDto.status})
  }
}
