import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      © {{year | date : 'yyyy'}} Todos os direitos resevados. <b><a href="https://www.brasal.com.br/" target="_blank">Brasal</a></b>
    </span>
  `,
})
export class FooterComponent {
  year: Date = new Date();
}
