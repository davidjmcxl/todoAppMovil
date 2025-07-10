import { Component } from '@angular/core';
import { CategoryService } from 'src/app/models/services/category.service';
import { AlertController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.categoryService.getAll();
  }

  async addCategory() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Categoría',
      inputs: [{ name: 'name', type: 'text', placeholder: 'Nombre' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: async (data) => {
            if (data.name?.trim()) {
              await this.categoryService.add(data.name.trim());
              this.loadCategories();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async editCategory(cat: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Categoría',
      inputs: [{ name: 'name', type: 'text', value: cat.name }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            const name = data.name?.trim();
            if (name) {
              await this.categoryService.update(cat.id, name);
              this.loadCategories();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteCategory(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Categoría',
      message: '¿Estás seguro?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.categoryService.delete(id);
            this.loadCategories();
          },
        },
      ],
    });

    await alert.present();
  }
}
