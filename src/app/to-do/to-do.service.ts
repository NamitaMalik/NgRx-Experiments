import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ToDo} from './add-to-do/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  public toDos: Subject<ToDo> = new Subject<ToDo>();
  constructor() { }
}
