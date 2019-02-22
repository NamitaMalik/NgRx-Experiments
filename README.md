# Getting started with NgRx

At some point while building our Angular applications we feel the need to have a state management mechanism. One of the 
most popular state mechanism for Angular applications is **NgRx** which is inspired by **Redux**.

To understand how to work with **NgRx**, I built a tiny **ToDo** app and then tried to use **NgRx** with it.
Initially my **ToDo** app just consisted of the following:

1. AddToDoComponent
2. DisplayToDoComponent
3. ToDoService

The responsibilities of the above parts of the application were very simple and clear:

`AddToDoComponent` - Responsible for adding a ToDo item.
`DisplayToDoComponent` - Responsible for displaying a ToDo items.
`ToDoService` - Responsible for sharing data between AddToDo and DisplayToDoComponent

The flow was pretty simple:

`ToDoService` exposed a `todos$` subject to `AddToComponent` and `DisplayToDoComponent`:

```TypeScript
 export class ToDoService {
   public toDos$: Subject<ToDo> = new Subject<ToDo>();
 }
```

So, `AddToDoComponent` was simply emitting each ToDo entered by the user with the below simple line of 
code:

```TypeScript
this.toDoService.toDo$.next(new ToDo(this.item));
```

... and the `DisplayComponent`, simply subscribed to the `toDo$` subject, pushed it into an array and 
displayed it on the template with help of `*ngFor` directive. This is simple and probably doesn't even need a state 
management mechanism, but it would be fun to see how to achieve the same behavior using **NgRx**.

So let's start. There are few key concepts in **NgRx**, let's take them one by one:

* **Actions** - unique events that happen throughout the application. An Action can be anything - from network request 
to simple user interaction. Actions basically describe how events will be handled in your application.

    **Action** is an interface in **NgRx** with only one property i.e. `type`. 

     - `type` is defined in form `[Source] Event` - `Source` defines the origin of action whereas `Event` depicts the category of action.

    For our `ToDoApp`, we just need one **Action** for now i.e. `[AddToDo] ADD_TODO_ITEM`.

    Since `type` is the only property available in the `Action` interface, we need to add our own properties, 
    most common one being `payload` which adds the data associated with that action.

    So in our case, `to-do.actions` file would look like:

    ```TypeScript
    export const ADD_TODO_ITEM = '[AddToDo] ADD_TODO_ITEM';
    
    export class AddToDoItem implements Action {
      readonly type = '[AddToDo] ADD_TODO_ITEM';
      constructor(public payload: ToDo) {
      }
    }
    
    export type ToDoActions = AddToDoItem;
    ```

    As of now we just have one action in our **ToDo** app actions, but in future we can add more actions. So `ToDoActions` would 
    be a discriminated union of actions as our application will grow bigger.

* **Reducers** - handle transitions from one state to the next state. **Reducer** functions are pure functions, which means 
that they give same output for any given input. A reducer function basically takes two things:
    - Current State
    - Action Dispatched
    
    On the basis of above two, reducer determines whether to return a new modified state or the original state. 
    All reducers have the following consistent stuff:
    
    - Interface defining the shape of the state
    - Initial State and Action
    - The Switch statement
    
    So let's start building a reducer for our **ToDo** application:
    
    Our initial state would be:
    
    ```TypeScript
  const initialState: State = {
    toDos: []
  };
    ```
    
    And the interface defining our state would look as given below:
    
    ```TypeScript
    export interface State {
     toDos: ToDo[];
   }
    ```
    
    Now, we need to have a reducer function with 2 arguments - **initial state** and **action** :
    
    ```TypeScript
    export function ToDoReducer(state = initialState, action: ToDoActions.ToDoActions) { }
    ```
    
    What's left now? 
    
    ... a switch statement that should do some magic. So here we go:
    
    ```TypeScript
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
  ```
  
  In the above code, we basically check if the action is `ADD_TODO_ITEM` then, we should add new `ToDo` item to 
  `toDos` array. The item is available in the `payload` property of the action. We add the item and return the new state. 
  
  Let's move further. 
  
  We now need to register our state. In **NgRx**, state of the application is one large object. We use **StoreModule.forRoot()**
  to register the global providers for the application. This is done in the **AppModule** of the application as show below:
  
  ```TypeScript
   import { BrowserModule } from '@angular/platform-browser';
   import { NgModule } from '@angular/core';
   
   import { AppComponent } from './app.component';
   import { ToDoModule } from './to-do/to-do.module';
   import { StoreModule } from '@ngrx/store';
   import { ToDoReducer } from './to-do/store/to-do.reducers';
   
   @NgModule({
     declarations: [
       AppComponent
     ],
     imports: [
       BrowserModule,
       ToDoModule,
       StoreModule.forRoot({toDos: ToDoReducer})
     ],
     bootstrap: [AppComponent]
   })
   export class AppModule {
   }
   ```

I believe we are now one with our set up. We have defined actions and reducers, registered our store.
Now, let's dispatch `AddToDoItem` action from our `AddToDoComponent`:

```TypeScript
export class AddToDoComponent {
  item: string;

  constructor(private toDoService: ToDoService, private store: Store<{ toDos: { toDos: ToDo[] } }>) {
  }

  onSubmit() {
    const toDo = new ToDo(this.item);
    this.store.dispatch(new ToDoActions.AddToDoItem(toDo));
    this.item = '';
  }
}
```

We have dispatched an action, reducer function will modify our state according to the dispatched action. Now, what is left?

So, the last thing that is left is `DisplayToDoComponent` accessing this updated state:

```
export class DisplayToDoComponent implements OnInit {
  constructor(private store: Store<{toDos: {toDos: ToDo[]}}>) { }
  toDosState: Observable<{toDos: ToDo[]}>;

  ngOnInit() {
    this.toDosState = this.store.select('toDos');
  }
}
```

... and we can then display `ToDo` items in our template:

```HTML
<ul>
    <li *ngFor="let toDo of (toDosState | async).toDos">
        {{toDo.item}}
    </li>
</ul>
```

That's it! But before we end I would like us to take a deeper look at the statement:

```TypeScript
this.toDosState = this.store.select('toDos');
```

The above statement introduces us to another very important concept i.e **Selectors**.
**Selectors** like reducers are **pure functions**. They take state as an argument and return data 
which can be passed to the Components. We used `store.state` method to get `ToDo` items from the **Store** by passing state `toDos`.

Follow Me
---
[Github](https://github.com/NamitaMalik)

[Twitter](https://twitter.com/namita13_04)

[LinkedIn](https://in.linkedin.com/in/namita-malik-a7885b23)

[More Blogs By Me](https://namitamalik.github.io/)
