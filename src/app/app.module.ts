import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ToDoModule} from './to-do/to-do.module';
import {StoreModule} from '@ngrx/store';
import {ToDoReducer} from './to-do/store/to-do.reducers';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ToDoModule,
        StoreModule.forRoot({toDos: ToDoReducer})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
