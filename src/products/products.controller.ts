import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { paginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  CreateProduct(@Body() productDto: CreateProductDto){
    return this.client.send({ cmd: 'create_product'},productDto)
    .pipe(
      catchError( error => { throw new RpcException(error)})
    )
  }

  @Get()
  FinAllProducts( @Query() paginationdto: paginationDto){
    return this.client.send({ cmd: 'get_all_product'},paginationdto)
  }

  @Get(':id')
  async FindOneProduct(@Param('id', ParseIntPipe  ) id: string){
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'find_one_product'},{ id })
      )
      return product; 

    } catch (error) {
        throw new RpcException(error);
    }
   
  }

  @Patch(':id')
  UpdateProduct(@Param('id') id: string, @Body() updateProductDto:UpdateProductDto){
    return this.client.send({ cmd: 'update_product'},{ id, data:updateProductDto})
    .pipe(
      catchError( error => { throw new RpcException(error)})
    )
  }

  @Delete(':id')
  DeleteProduct(@Param('id') id: string){
    return this.client.send({ cmd: 'delete_product'},id)
    .pipe(
      catchError( error => { throw new RpcException(error)})
    )
  }


}

