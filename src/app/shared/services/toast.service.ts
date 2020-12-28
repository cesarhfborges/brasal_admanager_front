import {Injectable} from '@angular/core';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastrConfig} from '@nebular/theme/components/toastr/toastr-config';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  // private config: NbToastrConfig = {
  //   hasIcon: false,
  //   icon: undefined,
  //   iconPack: 'eva',
  //   icons: undefined,
  //   toastClass: '',
  //   status: 'success',
  //   duration: 2000,
  //   destroyByClick: true,
  //   preventDuplicates: true,
  //   duplicatesBehaviour: 'previous',
  //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
  //   limit: 6,
  //   patchIcon: config1 => {}
  // }

  constructor(
    private toastrService: NbToastrService
  ) {
  }

  showToastSuccess(message, title) {
    this.toastrService.show(message, title, {
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      status: 'success',
      duration: 3000,
    });
  }

  showToastDanger(message, title) {
    this.toastrService.show(message, title, {
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      status: 'danger',
      duration: 3000,
    });
  }

  showToastWarning(message, title) {
    this.toastrService.show(message, title, {
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      status: 'warning',
      duration: 3000,
    });
  }

  showToastInfo(message, title) {
    this.toastrService.show(message, title, {
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      status: 'info',
      duration: 3000,
    });
  }
}
