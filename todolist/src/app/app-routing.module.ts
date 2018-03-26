import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo-list/todo-list.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

const routes: Routes = [
  {path: 'todos', component: TodoListComponent},
  {path: 'people', component: PeopleListComponent},
  {path: 'add-todo', component: AddTodoComponent},
  {path: 'edit/:id', component: EditTodoComponent},
  {path: '', redirectTo: '/todos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
