import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { v4 as uuidv4 } from 'uuid';
import { Task } from '../task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];
  private storageReady = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.storageReady = true;
    const storedTasks = await this.storage.get('tasks');
    this.tasks = storedTasks || [];
  }

  getAll(): Task[] {
    return this.tasks;
  }

  async add(title: string, categoryId?: string): Promise<void> {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      categoryId,
    };
    this.tasks.push(newTask);
    await this.save();
  }

  async delete(taskId: string): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    await this.save();
  }

  async toggleComplete(taskId: string): Promise<void> {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      await this.save();
    }
  }

  private async save() {
    if (this.storageReady) {
      await this.storage.set('tasks', this.tasks);
    }
  }
}
