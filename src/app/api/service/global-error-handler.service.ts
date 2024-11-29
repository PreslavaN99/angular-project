import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Логика за обработка на грешки
    console.error('Global error caught:', error);
    // Може да добавите пренасочване или показване на съобщение за грешка.
  }
}
