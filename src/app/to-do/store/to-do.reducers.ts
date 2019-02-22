import { ToDo } from '../add-to-do/todo.model';
import * as ToDoActions from './to-do.actions';

export interface State {
  toDos: ToDo[];
}

const initialState: State = {
  toDos: []
};

export function ToDoReducer(state = initialState, action: ToDoActions.ToDoActions) {
  switch (action.type) {
    case ToDoActions.ADD_TODO_ITEM:
      return {
        ...state,
        toDos: [...state.toDos, action.payload]
      };
    default:
      return state;
  }
}
