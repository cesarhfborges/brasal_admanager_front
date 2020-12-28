import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'input[ngxInputFocus]'
})
export class InputFocusDirective implements AfterViewInit {

  constructor(
    private element: ElementRef<HTMLInputElement>
  ) {
  }

  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }
}
