import { IsEnum, IsOptional } from "class-validator";
import { OrderListStatus, OrderStatus } from "../enum/order.enum";

export class StatusDto  {
    
    @IsOptional()
    @IsEnum(OrderListStatus,{
        message:`List value are: ${OrderListStatus}`
    })
    status: OrderStatus;
}