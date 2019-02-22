import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import {ToDo} from './todo.model';
import {ToDoService} from '../to-do.service';
import * as ToDoActions from '../store/to-do.actions';

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.css']
})
export class AddToDoComponent {
  item: string;
  constructor(private toDoService: ToDoService, private store: Store<{toDos: {toDos: ToDo[]}}>) { }

  onSubmit() {
    const toDo = new ToDo(this.item);
    this.store.dispatch(new ToDoActions.AddToDoItem(toDo));
    this.item = '';
  }
}
