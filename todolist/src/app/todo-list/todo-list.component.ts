import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ITodoItem } from '../itodo-item';
import { IPerson } from '../iperson';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  ADDRESS: string = 'http://localhost:8080/api/';
  todoItems: ITodoItem[];
  people: Observable<IPerson[]>;
  constructor(private httpClient: HttpClient) {
    this.refreshTodoItems();
    this.people = httpClient.get<IPerson[]>(this.ADDRESS + 'people');
  }

  private refreshTodoItems(): void {
    this.httpClient.get<ITodoItem[]>(this.ADDRESS + 'todos')
    .subscribe(data => this.todoItems = data);
  }

  ngOnInit() {
  }
  markAsDone(id: number): void {
    const content: Object = {'done': true};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.httpClient.patch(this.ADDRESS + 'todos/' + id,
      content, options)
      .subscribe(data => {
        console.log(data);
        this.refreshTodoItems();
      });
  }
  deleteTodo(id: number): void {
    this.httpClient.delete(this.ADDRESS + 'todos/' + id)
      .subscribe(data => {
        console.log(data);
        this.refreshTodoItems();
      });
  }
}
