import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { v4 as uuidv4 } from 'uuid';
import { Category } from '../category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categories: Category[] = [];

  constructor(private storage: Storage) {
    this.init();
  }
  /**
   * Inicializa el servicio de categorías.
   * Crea el almacenamiento si aún no existe y recupera las categorías guardadas.
   */
  async init() {
    await this.storage.create();
    const stored = await this.storage.get('categories');
    this.categories = stored || [];
  }
  /**
   * Obtiene todas las categorías almacenadas en memoria.
   * @returns Arreglo de objetos `Category`.
   */
  getAll(): Category[] {
    return this.categories;
  }
  /**
   * Obtiene todas las categorías almacenadas en memoria.
   * @returns Arreglo de objetos `Category`.
   */
  async add(name: string): Promise<void> {
    const newCategory: Category = { id: uuidv4(), name };
    this.categories.push(newCategory);
    await this.save();
  }
  /**
   * Actualiza el nombre de una categoría existente.
   * @param id - ID de la categoría a modificar.
   * @param name - Nuevo nombre de la categoría.
   */
  async update(id: string, name: string): Promise<void> {
    const category = this.categories.find(c => c.id === id);
    if (category) {
      category.name = name;
      await this.save();
    }
  }
  /**
   * Elimina una categoría según su ID.
   * @param id - ID de la categoría a eliminar.
   */
  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter(c => c.id !== id);
    await this.save();
  }
  /**
   * Guarda el estado actual de las categorías en el almacenamiento.
   * Es un método privado utilizado internamente.
   */
  private async save() {
    await this.storage.set('categories', this.categories);
  }
}
