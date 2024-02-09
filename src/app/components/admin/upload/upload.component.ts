import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faAdd, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  faAdd = faAdd
  faAngleDown = faAngleDown
  
  selectedValue: string = '';
  inputValue: string = ''
  newCategory: boolean = false
  isChecked: boolean = false
  products?: Product[]
  categories: string[] = []
  selectedFiles: File[] = [];


  handleAnchorClick(value: string) {
    this.selectedValue = value;
    this.selectedValue
    this.openOptions();
  }
  
  openOptions(){
    const options = document.getElementById('options')    
    const select = document.getElementById('select')
    if (select && options) {
      select.classList.toggle('border-blue-500')
      options.classList.toggle('hidden')
    }   
  }

  constructor(private productService: ProductsService, private cd:ChangeDetectorRef){}

  onFileSelected(event: any) {
    this.selectedFiles.push(event.target.files[0]);
  }

  ngOnInit() {
    this.productService.getAllCategories().then(() => {
      this.categories = this.productService.categories      
    })
    this.productService.getAllProducts().then(products => {
      this.products = products;            
    }).catch(error => {
      console.error('Error fetching products:', error);
    });
  }

  imageNN(){
    console.log();
    
  }

  async onFormSubmit(form: NgForm){
    const imageNames: string[] = [];
    for (const file of this.selectedFiles) {
      if (file) {
        await this.productService.addImage(file.name, file)
        const imageName = file.name
        if (imageNames) {
          imageNames.push(imageName)
        } else {
          console.error(`Error uploading an image:`, file)
        }
      }
    }
    
    await this.productService.addProduct(new Product(form.value.name, form.value.description, form.value.price, this.isChecked, form.value.category, imageNames[0], imageNames[1], imageNames[2]))
    
    this.ngOnInit()    
    setTimeout(() => {
      form.resetForm()
      imageNames.length = 0
      this.cd.detectChanges()
      
    }, 500);
    

  }
}
