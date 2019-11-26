import { RefDTO } from './ref.dto';
import { PaymentDTO } from './payment.dto';
import { ItemOrderDTO } from './itemorder.dto';

export interface OrderDTO {
    customer: RefDTO;
    address: RefDTO;
    payment: PaymentDTO;
    items: ItemOrderDTO[];
}