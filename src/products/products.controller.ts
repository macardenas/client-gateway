import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { paginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productscliente: ClientProxy
  ) {}

  @Post()
  CreateProduct(@Body() productDto: CreateProductDto){
    return this.productscliente.send({ cmd: 'create_product'},productDto)
    .pipe(
      catchError( error => { throw new RpcException(error)})
    )
  }

  @Get()
  FinAllProducts( @Query() paginationdto: paginationDto){
    return this.productscliente.send({ cmd: 'get_all_product'},paginationdto)
  }

  @Get(':id')
  async FindOneProduct(@Param('id', ParseIntPipe  ) id: string){
    try {
      const product = await firstValueFrom(
        this.productscliente.send({ cmd: 'find_one_product'},{ id })
      )
      return product; 

    } catch (error) {
        throw new RpcException(error);
    }
   
  }

  @Patch(':id')
  UpdateProduct(@Param('id') id: string, @Body() updateProductDto:UpdateProductDto){
    return this.productscliente.send({ cmd: 'update_product'},{ id, data:updateProductDto})
    .pipe(
      catchError( error => { throw new RpcException(error)})
    )
  }

  @Delete(':id')
  DeleteProduct(@Param('id') id: string){
    return this.productscliente.send({ cmd: 'delete_product'},id)
    .pipe(
      catchError( error => { throw new RpcException(error)})
    )
  }


}

