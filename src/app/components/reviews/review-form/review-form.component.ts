import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Reviews } from 'src/app/models/reviews.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {
  faStar = faStar
  rate: number = 0

  constructor(private ps: ProductsService){}

  refresh(): void {
    window.location.reload();
  }
  
  async addReview(review: NgForm){
    const _review: Reviews = new Reviews(review.value.clientName, review.value.rate, review.value.review, review.value.date)
    await this.ps.addReview(_review)
    alert('Reseña añadida con exito.')    
    review.form.reset()
    this.refresh()
  }
}
