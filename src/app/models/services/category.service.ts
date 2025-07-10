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

  async init() {
    await this.storage.create();
    const stored = await this.storage.get('categories');
    this.categories = stored || [];
  }

  getAll(): Category[] {
    return this.categories;
  }

  async add(name: string): Promise<void> {
    const newCategory: Category = { id: uuidv4(), name };
    this.categories.push(newCategory);
    await this.save();
  }

  async update(id: string, name: string): Promise<void> {
    const category = this.categories.find(c => c.id === id);
    if (category) {
      category.name = name;
      await this.save();
    }
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter(c => c.id !== id);
    await this.save();
  }

  private async save() {
    await this.storage.set('categories', this.categories);
  }
}
