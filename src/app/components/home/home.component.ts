import { Component, HostListener } from '@angular/core';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp, faPhone, faReceipt, faMobilePhone, faPhoneFlip, faLocationDot } from '@fortawesome/free-solid-svg-icons';

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

  // ngOnInit(){
  //   setInterval(() => {
  //     this.onScroll()
  //   }, 4000);
  // }
}
