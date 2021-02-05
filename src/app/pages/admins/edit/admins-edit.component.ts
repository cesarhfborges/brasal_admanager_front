import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../../shared/models/usuario';
import {AdminsService} from '../../../shared/services/admins.service';
import {ToastService} from '../../../shared/services/toast.service';

@Component({
  selector: 'ngx-admins-edit',
  templateUrl: './admins-edit.component.html',
  styleUrls: ['./admins-edit.component.scss']
})
export class AdminsEditComponent implements OnInit {

  admin: Usuario;
  form: FormGroup;

  loading = {
    admin: false,
  };

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private adminsService: AdminsService,
    private toastService: ToastService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, []),
      password_confirmation: new FormControl(null, []),
    });
  }

  ngOnInit(): void {
    if (this.admin) {
      this.form.patchValue({
        name: this.admin.name,
        username: this.admin.username,
        email: this.admin.email,
      });
    } else {
      this.form.get('password').setValidators([Validators.required, Validators.minLength(4)]);
      this.form.get('password_confirmation').setValidators([Validators.required, Validators.minLength(4)]);
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading.admin = true;
      if (this.admin) {
        this.adminsService.updateAdmin(this.admin.id, this.form.value).subscribe(
          response => {
            this.loading.admin = false;
            this.dialogRef.close({...this.form.value, id: this.admin.id});
          },
          error => {
            this.loading.admin = false;
            this.toastService.showToastDanger(error.message, 'Ops');
            console.log(error);
          }
        );
      } else {
        this.adminsService.createAdmin(this.form.value).subscribe(
          response => {
            this.loading.admin = false;
            this.dialogRef.close({...this.form.value});
          },
          error => {
            this.loading.admin = false;
            console.log(error);
            this.toastService.showToastDanger(error.message, 'Ops');
          }
        );
      }
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }
}
