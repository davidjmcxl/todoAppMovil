import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TasksPage } from './tasks.page';
import { RouterModule } from '@angular/router';
import { TasksPageRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [TasksPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPageRoutingModule ,
    RouterModule.forChild([{ path: '', component: TasksPage }]),
  ],
})
export class TasksPageModule {}
