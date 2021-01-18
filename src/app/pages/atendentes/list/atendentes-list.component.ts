import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-atendentes-list',
  templateUrl: './atendentes-list.component.html',
  styleUrls: ['./atendentes-list.component.scss']
})
export class AtendentesListComponent implements OnInit {
  atendentes: any = [
    {
      code: 'teste',
      name: 'teste',
      category: 'teste',
      quantity: 'teste',
    },
    {
      code: 'teste',
      name: 'teste',
      category: 'teste',
      quantity: 'teste',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
