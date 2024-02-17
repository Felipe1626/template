import { Component, HostListener } from '@angular/core';
import { Reviews } from '../../models/reviews.model';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp, faPhone, faReceipt, faMobilePhone, faPhoneFlip, faLocationDot, faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faArrowUp = faArrowUp
  faPhone = faPhone
  faWhatsapp = faWhatsapp
  faInstagram = faInstagram
  faFacebook = faFacebook
  faReceipt = faReceipt
  faMobilePhone = faMobilePhone
  faPhoneFlip = faPhoneFlip
  faLocationDot = faLocationDot
  faAngleRight = faChevronRight
  faAngleLeft = faChevronLeft
  faStar = faStar

  reviews: Reviews[] = [
    {'clientName': 'Juan Pérez', 'rate': 4, 'review': 'La comida estaba deliciosa y el servicio fue exelente, personalmente me encantó el salmon a la parrilla, definitivamente volveré.', 'date': '01,02,2024'},
    {'clientName': 'María García', 'rate': 5, 'review': '¡Experiencia absolutamente fantástica! El ambiente era encantador, el personal fue atento y la comida estaba de primera. ¡Altamente recomendado!', 'date': '05,12,2023'},
    {'clientName': 'Carlos López', 'rate': 3, 'review': 'La comida estuvo bien, pero el servicio fue lento. El restaurante parecía tener poco personal. Espero que mejoren en el futuro.', 'date': '20,10,2023'},
    {'clientName': 'Laura Rodríguez', 'rate': 5, 'review': '¡Tuve una experiencia increíble aquí! La presentación de los platos fue hermosa y todo estaba increíble. Definitivamente lo recomendaré a amigos y familiares.', 'date': '15,01,2024'},
    {'clientName': 'Javier Gómez', 'rate': 2, 'review': 'Decepcionante. La comida estaba insípida y las porciones eran pequeñas para el precio. No vale la pena.', 'date': '08,09,2023'},
    {'clientName': 'Ana Martínez', 'rate': 4, 'review': 'En general, una experiencia gastronómica agradable. La comida estaba sabrosa y el ambiente era acogedor. Sin embargo, el servicio podría haber sido un poco más rápido.', 'date': '10,02,2024'}
  ]


  images: string[] = ['../../../assets/promos/1.png', '../../../assets/promos/2.png', '../../../assets/promos/3.png']
  itemsToShow: number = 4;
  currentIndex: number = 0;

  get displayedImages(): string[] {
    const length = this.images.length;
    const startIndex = this.currentIndex;
    const endIndex = (this.currentIndex + this.itemsToShow) % length;
    
    if (startIndex < endIndex) {
      return this.images.slice(startIndex, endIndex);
    } else {
      return [...this.images.slice(startIndex), ...this.images.slice(0, endIndex)];
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  currentRIndex: number = 0;

  get displayedReviews(): Reviews[] {
    const length = this.reviews.length;
    const startIndex = this.currentRIndex;
    const endIndex = (this.currentRIndex + this.itemsToShow) % length;
    
    if (startIndex < endIndex) {
      return this.reviews.slice(startIndex, endIndex);
    } else {
      return [...this.reviews.slice(startIndex), ...this.reviews.slice(0, endIndex)];
    }
  }

  nextR() {
    this.currentRIndex = (this.currentRIndex + 1) % this.reviews.length;
  }
  
  prevR() {
    this.currentRIndex = (this.currentRIndex - 1 + this.reviews.length) % this.reviews.length;
  }
  // onScroll(): void {
  //   const nav = document.getElementById('menu-nav');
  //   const scrollLeft = nav!.scrollLeft;

  //   if (scrollLeft < 160) {
  //     const startTime = performance.now();
  //     const duration = 4000; 

  //     function easeInOutQuad(t: number): number {
  //       return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  //     }

  //     function step(currentTime: number) {
  //       const progress = (currentTime - startTime) / duration;

  //       nav!.scrollLeft += easeInOutQuad(progress) * 20;

  //       if (progress < 1) {
  //         requestAnimationFrame(step);
  //       }
  //     }
  //     requestAnimationFrame(step);

     
  //   }
  // }

  ngOnInit(){
    setInterval(() => {
      //this.onScroll()
      this.nextR()
      this.next()
    }, 15000);
  }
}
