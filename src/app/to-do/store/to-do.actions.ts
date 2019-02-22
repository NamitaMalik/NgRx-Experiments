import { Action } from '@ngrx/store';
import { ToDo } from '../add-to-do/todo.model';

export const ADD_TODO_ITEM = '[AddToDo] ADD_TODO_ITEM';

export class AddToDoItem implements Action {
  readonly type = '[AddToDo] ADD_TODO_ITEM';
  constructor(public payload: ToDo) {
  }
}

export type ToDoActions = AddToDoItem;
