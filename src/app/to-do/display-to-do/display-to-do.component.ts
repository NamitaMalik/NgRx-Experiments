import { Component, OnInit } from '@angular/core';

import {ToDoService} from '../to-do.service';
import {ToDo} from '../add-to-do/todo.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-display-to-do',
  templateUrl: './display-to-do.component.html',
  styleUrls: ['./display-to-do.component.css']
})
export class DisplayToDoComponent implements OnInit {
  constructor(private store: Store<{toDos: {toDos: ToDo[]}}>) { }
  toDosState: Observable<{toDos: ToDo[]}>;

  ngOnInit() {
    this.toDosState = this.store.select('toDos');
  }
}
