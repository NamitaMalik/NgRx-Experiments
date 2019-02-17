import { Component, OnInit } from '@angular/core';

import {ToDoService} from '../to-do.service';
import {ToDo} from '../add-to-do/todo.model';

@Component({
  selector: 'app-display-to-do',
  templateUrl: './display-to-do.component.html',
  styleUrls: ['./display-to-do.component.css']
})
export class DisplayToDoComponent implements OnInit {
  constructor(private toDoService: ToDoService) { }
  toDos: ToDo[] = [];

  ngOnInit() {
    this.toDoService.toDos.subscribe((toDo) => {
      this.toDos.push(toDo);
    });
  }

}
