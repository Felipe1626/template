import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Images } from 'src/app/models/images.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})
export class PromosComponent {
  selectedFiles: File[] = []
  faTrashCan = faTrashCan
  avalaible: boolean = false
  images: Images[] = [
    { 'imgName': '../../../assets/promos/1.png', 'avalaible': true, 'imgUrl': ''}, 
    { 'imgName': '../../../assets/promos/2.png', 'avalaible': true, 'imgUrl': ''}, 
    { 'imgName': '../../../assets/promos/3.png', 'avalaible': true, 'imgUrl': ''}
  ]
  imgs: string[] = ['../../../../assets/311x192px/1.png', '../../../../assets/311x192px/2.png', '../../../../assets/311x192px/3.png', '../../../../assets/311x192px/4.png', '../../../../assets/311x192px/5.png', '../../../../assets/311x192px/6.png', '../../../../assets/311x192px/7.png', '../../../../assets/311x192px/8.png', '../../../../assets/311x192px/9.png', '../../../../assets/311x192px/10.png', '../../../../assets/311x192px/11.png', '../../../../assets/311x192px/12.png', '../../../../assets/311x192px/13.png', '../../../../assets/311x192px/14.png', '../../../../assets/311x192px/15.png', '../../../../assets/311x192px/16.png', '../../../../assets/311x192px/17.png', '../../../../assets/311x192px/18.png', '../../../../assets/311x192px/19.png', '../../../../assets/311x192px/20.png']

  constructor(private ps: ProductsService){}

  onFileSelected(event: any) {
    if (event) {
      for(let file of event.target.files){
        this.selectedFiles.push(file)
      }
    }
  }

  refresh(): void {
    window.location.reload();
  }

  async onFormSubmit(form: NgForm, bucket: string) {
    for (const file of this.selectedFiles) {
      if (file) {
        const imageName = file.name;
        await this.ps.addImage(imageName, file)
        await this.ps.addImagesNames(imageName, bucket)
      }
    }

    form.resetForm()  
    alert('Imagenes cargadas con exito')
    this.selectedFiles = []
    this.refresh()
  }

  async deleteImage(imgInfo: any, bucket: string, i: number) { 
    if (!imgInfo || typeof imgInfo !== 'object') {
      console.error('Invalid imgInfo:', imgInfo);
      return;
    }
    const imgName = imgInfo.name;  
    await this.ps.deleteImage(imgName, bucket, 'imgs_wSlider_names');
    setTimeout(() => {
      this.images.splice(i, 1);
    }, 2000);

  }

  ngOnInit(){
    this.ps.getAllImages('imgs_wSlider_names','welcome-slider').then(imgs => {
      //this.images = imgs
    })
  }
}
