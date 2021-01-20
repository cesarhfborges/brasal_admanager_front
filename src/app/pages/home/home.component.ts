import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import {RelatoriosService} from '../../shared/services/relatorios.service';
import {AtendentesService} from '../../shared/services/atendentes.service';
import {PostosService} from '../../shared/services/postos.service';
import {Atendente} from '../../shared/models/atendente';
import {Posto} from '../../shared/models/posto';
import {endOfMonth, format, startOfMonth, subMonths} from 'date-fns';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dateNow: Date = subMonths(new Date(), 0);

  loading = {
    relatorio: false,
    filiais: false,
    atendentes: false,
  };

  cols = [
    {field: 'id', header: '#', width: '100px', class: 'text-center', type: null},
    {field: 'attendant', subfield: 'name', header: 'Atendente', width: 'auto', class: '', type: null},
    {field: 'client', subfield: 'name', header: 'Cliente', width: 'auto', class: '', type: null},
    {field: 'pix_value', header: 'Valor', width: '180px', class: 'text-right', type: 'money'},
    {field: 'pix_created_at', header: 'Data', width: '180px', class: 'text-right', type: 'date'},
  ];

  relatorio: any;
  atendentes: Atendente[];
  filiais: Posto[];

  form: FormGroup;

  constructor(
    private relatoriosService: RelatoriosService,
    private atendentesService: AtendentesService,
    private filiaisService: PostosService,
    private datePipe: DatePipe,
  ) {
    this.form = new FormGroup({
      dataInicial: new FormControl(startOfMonth(this.dateNow), []),
      dataFinal: new FormControl(endOfMonth(this.dateNow), []),
      filial: new FormControl(null, []),
      atendente: new FormControl(null, []),
    });
  }

  ngOnInit(): void {
    this.getFiliais();
  }

  getFiliais() {
    this.loading.filiais = true;
    this.filiaisService.getPostosCombo().subscribe(
      response => {
        this.filiais = response;
        this.loading.filiais = false;
      },
      error => {
        this.loading.filiais = false;
      }
    );
  }

  getAtendentes(id: number) {
    this.loading.atendentes = true;
    this.atendentesService.getAtendentesCombo(id).subscribe(
      response => {
        this.atendentes = response;
        this.loading.atendentes = false;
      },
      error => {
        console.log(error);
        this.loading.atendentes = false;
      }
    );
  }

  onSubmit() {
    this.relatoriosService.gerarRelatorio(this.form.value).subscribe(
      response => {
        this.relatorio = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  selPosto($event: any) {
    if ($event) {
      this.getAtendentes($event.id);
    } else {
      this.atendentes = undefined;
      this.form.get('atendente').reset();
    }
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const tabData = this.relatorio.map(i => {
        return {
          ID: i.id,
          Atendente: i.attendant.name,
          Cliente: i.client.name,
          Valor: i.pix_value,
          Data: this.datePipe.transform(i.pix_created_at, 'dd/MM/yyyy HH:mm:ss'),
        }
      });
      const worksheet = xlsx.utils.json_to_sheet(tabData);
      const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, `relatorio de vendas - ${format(new Date(), 'dd-MM-yyyy HH_mm_ss')}`);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    });
  }

  // exportPdf() {
  //   import('jspdf').then(jsPDF => {
  //     import('jspdf-autotable').then(jsAutoTable => {
  //       const tabData = this.relatorio.map(i => {
  //         return {
  //           ID: i.id,
  //           Atendente: i.attendant.name,
  //           Cliente: i.client.name,
  //           Valor: i.pix_value,
  //           Data: this.datePipe.transform(i.pix_created_at, 'dd/MM/yyyy HH:mm:ss'),
  //         }
  //       });
  //       const head = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  //       const doc = new jsPDF.default('p', 'px', 'string', false);
  //       console.log(head);
  //       doc.autotable(head, tabData);
  //       // autoTable(this.exportColumns, this.products);
  //       doc.save(`relatorio de vendas - ${format(new Date(), 'dd-MM-yyyy HH_mm_ss')}.pdf`);
  //     })
  //   })
  // }
}
