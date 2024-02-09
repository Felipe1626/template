export interface Cart {
  items: Array<CartItem>;
}

export interface CartItem {
  img: string
  name: string
  price: number 
  quantity: number 
  comment: string 
  avalaible: boolean
}

export class Total{
  totalQuantity: number = 1;
  totalValue: number = 0;
}