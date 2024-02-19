import { Component } from '@angular/core';
import { faBars, faBarsStaggered, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  products: Product[] = []
  isChecked: boolean = false
  actualPage: string = 'Disponibilidad'
  load: boolean = false
  isOpen: boolean = false

  faBars = faBars
  faBarsStaggered = faBarsStaggered
  faXmark = faXmark
  constructor(private productsService: ProductsService){ }

  openMenu(){
    this.isOpen = !this.isOpen
  }

  async updateProduct(name: string, newValue: boolean){    
    let isAvalaible: boolean = false;
    if (isAvalaible !== newValue) {
      isAvalaible = true
    }else{
      isAvalaible = false
    }
    await this.productsService.updateProductAvalaibility(name, isAvalaible)
  }

  ngOnInit() {
    this.load = true
    this.productsService.getAllProducts().then(products => {
      this.products = products
      this.load = false
    }).catch(error => {
      console.error('Error fetching products:', error);
    });
  }
}
