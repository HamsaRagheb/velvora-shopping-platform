import { Injectable } from '@angular/core';
import { title } from 'node:process';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  // Geenral SweetAlert2 Method
  private show(title: string, text: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK',
      confirmButtonColor: '#0F2854',
      draggable: true,
    });
  }

  // error sweetalert
  error(title: string, text: string) {
    return this.show(title, text, 'error');
  }

  // success sweetalert
  success(title: string, text: string) {
    return this.show(title, text, 'success');
  }
}
