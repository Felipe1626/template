import { Component } from '@angular/core';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Reviews } from 'src/app/models/reviews.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  faStar = faStar
  faTrash = faTrash
  reviews: Reviews[] = [
    {'clientName': 'Juan Pérez', 'rate': 4, 'review': 'La comida estaba deliciosa y el servicio fue exelente, personalmente me encantó el salmon a la parrilla, definitivamente volveré.', 'date': '01,02,2024', 'publish': true},
    {'clientName': 'María García', 'rate': 5, 'review': '¡Experiencia absolutamente fantástica! El ambiente era encantador, el personal fue atento y la comida estaba de primera. ¡Altamente recomendado!', 'date': '05,12,2023', 'publish': true},
    {'clientName': 'Carlos López', 'rate': 3, 'review': 'La comida estuvo bien, pero el servicio fue lento. El restaurante parecía tener poco personal. Espero que mejoren en el futuro.', 'date': '20,10,2023', 'publish': true},
    {'clientName': 'Laura Rodríguez', 'rate': 5, 'review': '¡Tuve una experiencia increíble aquí! La presentación de los platos fue hermosa y todo estaba increíble. Definitivamente lo recomendaré a amigos y familiares.', 'date': '15,01,2024', 'publish': true},
    {'clientName': 'Javier Gómez', 'rate': 2, 'review': 'Decepcionante. La comida estaba insípida y las porciones eran pequeñas para el precio. No vale la pena.', 'date': '08,09,2023', 'publish': true},
    {'clientName': 'Ana Martínez', 'rate': 4, 'review': 'En general, una experiencia gastronómica agradable. La comida estaba sabrosa y el ambiente era acogedor. Sin embargo, el servicio podría haber sido un poco más rápido.', 'date': '10,02,2024', 'publish': true}
  ]


  constructor(private ps: ProductsService){}

  deleteReview(id: number){
    this.ps.deleteReview(id)
    alert('Eliminado exitosamente.')
    this.ngOnInit()
  }

  refresh(){
    window.location.reload()
  }

  async makePublic(id: number, value: boolean){
    let isPublic: boolean = false;
    if (isPublic !== value) {
      isPublic = true
    }else{
      isPublic = false
    }
    await this.ps.makePublic(id, isPublic)
  }

  ngOnInit(){
    // this.ps.getReviews().then(_reviews => {
    //   this.reviews = _reviews
    // })
  }
}
