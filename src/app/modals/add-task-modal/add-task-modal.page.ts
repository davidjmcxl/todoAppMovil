import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';


@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.page.html',
  styleUrls: ['./add-task-modal.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

  ],
})
export class AddTaskModalPage {
  @Input() categories: Category[] = [];

  title: string = '';
  selectedCategoryId: string = '';

  constructor(private modalCtrl: ModalController) {}

  save() {
    if (this.title.trim().length > 0) {
      this.modalCtrl.dismiss({
        title: this.title.trim(),
        categoryId: this.selectedCategoryId || undefined,
      });
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
