import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFocusDirective } from './directives/input-focus.directive';



@NgModule({
  declarations: [
    InputFocusDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    InputFocusDirective
  ]
})
export class SharedModule { }
