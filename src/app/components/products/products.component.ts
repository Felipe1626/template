import { Component } from '@angular/core';
import { faAngleDown, faArrowUp, faCheck, faClose, faHandPointer, faPenToSquare, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { __values } from 'tslib';

type products = { [key: string]: Product[] };

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  cart: Cart = { items: []};
  products: products = {}
  allProducts: number[] = []
  faHandPointer = faHandPointer
  faPenToSquare = faPenToSquare
  faClose = faClose
  faShoppingBasket = faShoppingBasket
  faArrowUp = faArrowUp
  faCheck = faCheck
  faAngleDown = faAngleDown

  load: boolean = false
  comment: boolean = false
  selectedValue: string = 'Adicionales'
  commentValue: string = ''
  purchaseIndex: number[] = []
  imageIndices: number[] = []
  categories: string[] = []
  servings: string[] = []
  open: string | null = null
  openImg: string | null = null
  
  handleStatusAnchorClick(value: string) {
    if (value == 'Adicionales') {
      this.selectedValue = 'Adicionales'
    }else{
      this.selectedValue = value
      this.selectedValue
    }

    this.OpenCategoryOptions()
  }

  OpenCategoryOptions(){
    const businessOptions = document.getElementById('businessOptions')
    if (businessOptions) {
      businessOptions.classList.toggle('hidden');
    }
  }

  togglePurchase(P: Product) {
    this.open = P.name
  }

  closePurchase(){
    this.open = null
  }
  


  async addTCart(index: number, product: Product) {
    let _comment = 'N/A'
    if(product.comment){
      _comment = product.comment
    }
    const cartItem: CartItem = {
      img: product.imageSm!,
      name: product.name,
      price: product.price,
      avalaible: product.avalaible,
      quantity: product.quantity!,
      comment: _comment
    };
    setTimeout(() => {
      if( !this.cart.items.includes(cartItem)){
        this.cartService.addToCart(cartItem);
        this.cartService.getTotal(this.cart.items)
      }
    }, 3000);
    this.open = null
  }

  OpenImg(P: Product){
    if (this.openImg === P.name) {
      this.openImg = null
    }else[
      this.openImg = P.name
    ]
  }
  isOpen(P: Product): boolean {
    if (this.openImg === P.name) {
      return true
    }else{
      return false
    }
  }

  removeQuantity(index: number, product: Product){
    if (product.quantity) {
      if (product.quantity >= 0) {
        
        const cartItem: CartItem = {
          img: product.imageSm,
          name: product.name,
          price: product.price,
          avalaible: product.avalaible,
          quantity: product.quantity,
          comment: product.comment!
        };
        product.quantity --
      }      
    }
    if (product.quantity == 0) {
      this.closePurchase()
      product.quantity = 1;
    }
    this.cartService.getTotal(this.cart.items)
  }

  addQuantity(product: Product){
    const cartItem: CartItem = {
      img: product.imageSm,
      name: product.name,
      price: product.price,
      avalaible: product.avalaible,
      quantity: product.quantity!,
      comment: product.comment!
    };
    if (product.quantity) {
      if(product.quantity < 10){
        product.quantity ++
        console.log(product.quantity);
      }
    }
    this.cartService.getTotal(this.cart.items)

  }

  constructor(private productsService: ProductsService, private cartService: CartService ){ }

  ngOnInit() {
    this.load = true
    
    this.productsService.getServings().then(() => {
      this.servings = this.productsService.servings
    });
    this.productsService.getAllCategories().then(() => {
      this.categories = this.productsService.categories
      this.fetchProductsByCategory();
    });
  }

  fetchProductsByCategory() {
    this.categories.forEach(category => {
      this.productsService
        .getAllAvalaibleProducts(category)
        .then(products => {
          this.products[category] = products;
          this.load = false;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    });
  }
}
