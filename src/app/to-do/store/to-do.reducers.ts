import {ToDo} from '../add-to-do/todo.model';
import * as ToDoActions from './to-do.actions';

export interface State {
  toDos: any[];
}

const initialState: State = {
  toDos: [
    new ToDo('Something to do initially')
  ]
};

export function ToDoReducer(state = initialState, action: ToDoActions.ToDoActions) {
  switch (action.type) {
    case ToDoActions.ADD_TODO:
      return {
        ...state,
        toDos: [...state.toDos, action.payload]
      };

    default:
      return state;
  }
}
