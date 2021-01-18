import { Component, OnInit } from '@angular/core';
import {NgSelectConfig} from '@ng-select/ng-select';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private ngSelectConfig: NgSelectConfig
  ) {
    this.ngSelectConfig.notFoundText = 'Vázio';
    this.ngSelectConfig.appendTo = 'body';
    this.ngSelectConfig.loadingText = 'Carregando...';
    this.ngSelectConfig.typeToSearchText = 'Comece a digitar para pesquisar';
  }

  ngOnInit(): void {
  }
}
