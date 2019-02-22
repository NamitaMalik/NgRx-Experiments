# Getting started with NgRx

At some point while building our Angular applications we feel the need to have a state management mechanism. One of the 
most popular state mechanism for Angular applications is **ngRx** which is inspired by **Redux**.

To understand how to work with **ngRx**, I built a tiny **TODO** app and then tried to use **ngRx** with it.
Initially my **TODO** app just consisted of the following:

1. AddToDoComponent
2. DisplayToDoComponent
3. ToDoService

The responsibilities of the above parts of the application were very simple and clear:

`AddToDoComponent` - Responsible for adding a ToDo item.
`DisplayToDoComponent` - Responsible for displaying a ToDo items.
`ToDoService` - Responsible for sharing data between AddToDo and DisplayToDoComponent

The flow was pretty simple:

`ToDoService` exposed a `todos$` subject to `AddToComponent` and `DisplayToDoComponent`:

```JavaScript
 export class ToDoService {
   public toDos$: Subject<ToDo> = new Subject<ToDo>();
 }
```

So, `AddToDoComponent` was simply emitting each ToDo entered by the user with the below simple line of 
code:

```JavaScript
this.toDoService.toDo$.next(new ToDo(this.item));
```

... and the `DisplayComponent`, simply subscribed to the `toDo$` subject, pushed it into an array and 
displayed it on the template with help of `*ngFor` directive. This is simple and probably doesn't even need a state 
management mechanism, but it would be fun to see how to achieve the same behavior using **ngRx**.
