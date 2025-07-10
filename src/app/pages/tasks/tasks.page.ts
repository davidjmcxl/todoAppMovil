import { Component, inject, OnInit } from '@angular/core';
import { AlertController, AlertInput, ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/models/services/category.service';
import { TaskService } from 'src/app/models/services/task.service';
import { Task } from '../../models/task.model';
import { AddTaskModalPage } from 'src/app/modals/add-task-modal/add-task-modal.page';
import { fetchAndActivate, getValue, RemoteConfig } from '@angular/fire/remote-config';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false,
})
export class TasksPage implements OnInit {
  showCategoryFilter = false;
  remoteConfig = inject(RemoteConfig);
  tasks: Task[] = [];
   categories: Category[] = [];
   selectedCategoryId: string = '';

   constructor(
     private taskService: TaskService,
     private categoryService: CategoryService,
     private alertCtrl: AlertController,
      private modalCtrl: ModalController
   ) {}

   async ngOnInit() {
    await this.initRemoteConfig();
     this.loadCategories();
     this.loadTasks();
   }

   ionViewWillEnter() {
     this.loadCategories();
     this.loadTasks();
   }
   async initRemoteConfig() {
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 3600000, // 1 hora
      fetchTimeoutMillis: 10000            // 10 segundos
    };

    await fetchAndActivate(this.remoteConfig);
    const featureFlag = getValue(this.remoteConfig, 'showCategoryFilter');
    this.showCategoryFilter = featureFlag.asBoolean();
    console.log(' Feature flag:', this.showCategoryFilter);
  }
   loadTasks() {
     this.tasks = this.taskService.getAll();
   }

   loadCategories() {
     this.categories = this.categoryService.getAll();
   }

   get filteredTasks(): Task[] {
     if (!this.selectedCategoryId) return this.tasks;
     return this.tasks.filter(t => t.categoryId === this.selectedCategoryId);
   }

   getCategoryName(id: string | undefined): string {
     return this.categories.find(c => c.id === id)?.name || 'Sin categoría';
   }

   async addTask() {
    const modal = await this.modalCtrl.create({
      component: AddTaskModalPage,
      componentProps: {
        categories: this.categories,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.title) {
      await this.taskService.add(data.title, data.categoryId);
      this.loadTasks();
    }
  }


   async deleteTask(id: string) {
     const alert = await this.alertCtrl.create({
       header: 'Eliminar tarea',
       message: '¿Estás seguro de que deseas eliminar esta tarea?',
       buttons: [
         { text: 'Cancelar', role: 'cancel' },
         {
           text: 'Eliminar',
           handler: async () => {
             await this.taskService.delete(id);
             this.loadTasks();
           },
         },
       ],
     });

     await alert.present();
   }

   async toggleTask(id: string) {
     await this.taskService.toggleComplete(id);
     this.loadTasks();
   }
}
