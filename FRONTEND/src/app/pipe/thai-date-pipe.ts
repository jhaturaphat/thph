import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thaiDate'
})
export class ThaiDatePipe implements PipeTransform {
  transform(value: Date | string, format: string = 'medium'): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'วันที่ไม่ถูกต้อง';
    }

    const options: Intl.DateTimeFormatOptions = {};
    let thaiYear = date.getFullYear() + 543;
    let yearDisplay = thaiYear.toString();

    switch (format) {
      case 'short':
        options.day = 'numeric';
        options.month = 'short';        
        yearDisplay = yearDisplay.slice(-2); // แสดงปีแค่ 2 ตัวท้าย
        break;
        
      case 'long':
        options.weekday = 'long';
        options.day = 'numeric';
        options.month = 'long';
        options.year = 'numeric';
        break;
        
      case 'full':
        options.weekday = 'long';
        options.day = 'numeric';
        options.month = 'long';
        options.year = 'numeric';
        options.hour = '2-digit';
        options.minute = '2-digit';
        break;
        
      case 'medium':
      default:
        options.day = 'numeric';
        options.month = 'long';
        options.year = 'numeric';
        break;
    }

    const thaiDateStr = date.toLocaleDateString('th-TH', options);
    
    // สำหรับรูปแบบ short ที่ไม่แสดงปีใน options
    if (format === 'short') {
      return `${date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}${yearDisplay}`;
    }
    
    return thaiDateStr.replace(new RegExp(date.getFullYear().toString()), thaiYear.toString());
  }
}