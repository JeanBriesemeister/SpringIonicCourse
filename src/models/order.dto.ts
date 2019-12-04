import { RefDTO } from './ref.dto';
import { PaymentDTO } from './payment.dto';
import { OrderItemDTO } from './orderitem.dto';

export interface OrderDTO {
    customer: RefDTO;
    address: RefDTO;
    payment: PaymentDTO;
    items: OrderItemDTO[];
}