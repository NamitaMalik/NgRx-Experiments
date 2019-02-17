import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';

import {AddToDoComponent} from './add-to-do/add-to-do.component';
import { DisplayToDoComponent } from './display-to-do/display-to-do.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        TableModule
    ],
    declarations: [AddToDoComponent, DisplayToDoComponent],
    exports: [AddToDoComponent, DisplayToDoComponent]
})
export class ToDoModule {
}
