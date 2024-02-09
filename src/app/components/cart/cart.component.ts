import { Component } from '@angular/core';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faBan, faCheck, faClose, faMoneyCheckDollar, faReceipt, faSackXmark } from '@fortawesome/free-solid-svg-icons';
import { CartItem, Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  faReceipt = faReceipt
  faPenToSquare = faPenToSquare
  faClose = faClose
  faSackXmark = faSackXmark
  faTrashCan = faTrashCan
  faBan = faBan
  faDollar =faMoneyCheckDollar
  faCheck = faCheck
  
  editingComment: boolean = false
  totalQuantity: number = 0
  cart: Cart = { items: []};
  dataSource: Array<CartItem> = [];


  ngOnInit():void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
      this.cart.items.map(item => {
        if (item.comment === 'N/A') {
          item.comment = ''
        }
      })
    })
  }

  constructor (private cartService: CartService) { }

  openCart(){
    const cart = document.getElementById('cart')
    if (cart) {
      cart.classList.toggle('hidden')
    }
  }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  
  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onEditingComment(){
    this.editingComment = this.editingComment
  }

  onCancelEditComment(){
    this.editingComment = false 
  }

  calculateTotal(items: Array<CartItem>): number {
    return items.
      map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  async itemsMessage() {
    let items: string = '';
  
    if (this.cart.items.length) {
      const itemMessages = this.cart.items.map(item => {
        return `*Producto:* ${item.name}, *Valor:* ${item.price}, *Cantidad:* ${item.quantity}, *Comentario:* ${item.comment}.`;
      });
      items = itemMessages.join(' _   <=  ||  =>   _ ');
    }
  
    return items;
  }
  
  id: number = 3

  async startPayment() {
    let items: string = await this.itemsMessage()
    if (items){
      //   let parameters: Parameter[] = [
      //   {
      //     type: "text",
      //     text: "Jhon Doe"
      //   },
      //   {
      //     type: "text",
      //     text: "3001231212"
      //   },
      //   {
      //     type: "text",
      //     text: items
      //   },
      //   {
      //     type: "text",
      //     text: `*Valor Total:* ${ this.getTotal(this.cart.items) } Payment Succesfull`
      //   },
      //   {
      //     type: "text",
      //     text: `00000${this.id++}`
      //   }
      // ]
      
      // this.WACloudService.sendMessage(parameters).subscribe(
      //   resp => {
      //     console.log(items);
          
      //   }
      // )
    }else{
      //alert('EL Carrito De Compras Esta Vacio')
    }
    
  }

}
