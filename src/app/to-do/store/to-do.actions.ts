import {Action} from '@ngrx/store';
import {ToDo} from '../add-to-do/todo.model';

export const ADD_TODO = 'ADD_TODO';

export class AddToDo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: ToDo) {
  }
}

export type ToDoActions = AddToDo;
