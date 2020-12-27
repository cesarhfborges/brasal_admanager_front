import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  // template: '<router-outlet></router-outlet>',
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }

}
