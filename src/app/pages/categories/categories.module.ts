import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoriesPage } from './categories.page';
import { RouterModule } from '@angular/router';
import { CategoriesPageRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [CategoriesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    RouterModule.forChild([{ path: '', component: CategoriesPage }]),
  ],
})
export class CategoriesPageModule {}
