import { IsEnum, IsOptional } from "class-validator";
import { paginationDto } from "src/common";
import { OrderListStatus, OrderStatus } from "../enum/order.enum";


export class OrderPaginationDTO extends paginationDto {
    @IsOptional()
    @IsEnum(OrderListStatus,{
        message:`List value are: ${OrderListStatus}`
    })
    status: OrderStatus;
}