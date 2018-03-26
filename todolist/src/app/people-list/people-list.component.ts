import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IPerson } from '../iperson';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  people: Observable<IPerson>;
  constructor(private httpClient: HttpClient) {
    this.people = httpClient.get<IPerson>('http://localhost:8080/api/people');
  }

  ngOnInit() {
  }

}
