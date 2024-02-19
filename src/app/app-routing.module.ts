import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products.component';
import { HomeComponent } from './components/home/home.component';
import { ReviewFormComponent } from './components/reviews/review-form/review-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'productos', component: ManageProductsComponent},
  { path: 'reviews', component: ReviewFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
