import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IPerson } from '../iperson';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITodoItem } from '../itodo-item';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
  id: string;
  description: string;
  assignedTo: string;
  doneTick: boolean;
  people: Observable<IPerson[]>;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.people = httpClient.get<IPerson[]>('http://localhost:8080/api/people');
    this.route.paramMap.subscribe(param => this.id = param.get('id'));
    httpClient.get<ITodoItem>('http://localhost:8080/api/todos/' + this.id)
      .subscribe(data => {
        this.description = data.description;
        this.assignedTo = data.assignedTo;
        this.doneTick = data.done;
      });

  }

  ngOnInit() {
  }

  save(): void {
    const content: Object = { 'description': this.description, 'assignedTo': this.assignedTo, 'done': this.doneTick };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.httpClient.patch('http://localhost:8080/api/todos/' + this.id,
      content, options)
      .subscribe(data => {
        console.log(data);
        alert('Changes saved!');
      });
  }
}
