import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITodoItem } from '../itodo-item';
import { Observable } from 'rxjs/Observable';
import { IPerson } from '../iperson';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  description: string;
  assignedTo: string;
  people: Observable<IPerson[]>;
  constructor(private httpClient: HttpClient) {
    this.people = httpClient.get<IPerson[]>('http://localhost:8080/api/people');
  }

  ngOnInit() {
  }

  addTodo() {
    const user: string = (this.assignedTo) ? this.assignedTo : 'Nobody';
    const todoItem: Object = { 'description': this.description, 'assignedTo': user };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if (this.description) {
      this.httpClient.post<ITodoItem>('http://localhost:8080/api/todos',
        todoItem, options)
        .subscribe(data => {
          console.log(data);
          alert('Todo has been added!');
        });
    } else {
      alert(`Couldn't create Todo!`);
    }
  }
}
