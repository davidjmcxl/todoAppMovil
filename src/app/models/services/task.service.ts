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
  /**
   * Inicializa el servicio de tareas.
   * Crea el almacenamiento si aún no existe, marca el estado como listo
   * y carga las tareas almacenadas previamente.
   */
  async init() {
    await this.storage.create();
    this.storageReady = true;
    const storedTasks = await this.storage.get('tasks');
    this.tasks = storedTasks || [];
  }
  /**
   * Obtiene todas las tareas actualmente en memoria.
   * @returns Arreglo de objetos `Task`.
   */
  getAll(): Task[] {
    return this.tasks;
  }
  /**
   * Agrega una nueva tarea con un título y opcionalmente una categoría.
   * @param title - Título de la tarea.
   * @param categoryId - ID de la categoría a la que pertenece la tarea (opcional).
   */
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
  /**
 * Elimina una tarea según su ID.
 * @param taskId - ID de la tarea a eliminar.
 */
  async delete(taskId: string): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    await this.save();
  }
  /**
   * Alterna el estado de completado de una tarea.
   * Si estaba marcada como completada, se desmarca y viceversa.
   * @param taskId - ID de la tarea a modificar.
   */
  async toggleComplete(taskId: string): Promise<void> {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      await this.save();
    }
  }
  /**
   * Guarda las tareas en el almacenamiento persistente si está listo.
   * Método privado de uso interno.
   */
  private async save() {
    if (this.storageReady) {
      await this.storage.set('tasks', this.tasks);
    }
  }
}
