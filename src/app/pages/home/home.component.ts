import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lista: Array<{
    label: string;
    value: string;
    color: 'success' | 'info' | 'warning' | 'danger';
  }> = [
    {
      label: 'Usuários',
      value: '250',
      color: 'success'
    },
    {
      label: 'Grupos',
      value: '43',
      color: 'info',
    },
    {
      label: 'Férias',
      value: '43',
      color: 'warning',
    },
    {
      label: 'Desativados',
      value: '43',
      color: 'danger',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
