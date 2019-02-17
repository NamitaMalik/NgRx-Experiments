import { Component, OnInit } from '@angular/core';
import {ToDo} from './todo.model';

import {ToDoService} from '../to-do.service';

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.css']
})
export class AddToDoComponent implements OnInit {
  item: string;
  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.toDoService.toDos.next(new ToDo(this.item));
  }

}
