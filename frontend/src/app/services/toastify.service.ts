import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Toastify from 'toastify-js'

@Injectable({
  providedIn: 'root'
})
export class ToastifyService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  showToast(message: string): void {
    if (isPlatformBrowser(this.platformId)) {
      Toastify({
        text: message,
        duration: 3000,
        //destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#CC0505"
        },
        onClick: function(){} // Callback after click
      }).showToast();
    }
  }
}