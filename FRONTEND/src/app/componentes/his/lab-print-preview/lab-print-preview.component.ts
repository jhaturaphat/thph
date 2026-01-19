import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lab-print-preview',
  templateUrl: './lab-print-preview.component.html',
  styleUrls: ['./lab-print-preview.component.css']
})
export class LabPrintPreviewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,     // รับข้อมูลจาก Dialog
    private dialogRef: MatDialogRef<LabPrintPreviewComponent>  //ใช้สำหรับสั่งปิด Dialog
  ) { }

  displayedColumns: string[] = [
    'lab_items_name_ref',
    'lab_order_result',
    'lab_items_normal_value_ref'
  ];

  ngOnInit(): void {
    console.log('ข้อมูลที่รับมา:', this.data);
  }
  print() {
    const printContents = document.getElementById('print-section')?.innerHTML;
    console.log(printContents);
    const popupWin = window.open('', '_blank', 'width=800,height=600');
    popupWin!.document.open();
    popupWin!.document.write(`
      <html>
        <head>
          <title>Laboratory Report</title>
          <style>
            * {margin:0; padding:0;}
            @page { size: A4; margin: 15mm 20mm 10mm 20mm; }
            body { font-family: 'Sarabun', sans-serif; }
            .group-header { font-size: 20px } .group-header > span { font-size: 10px }
            tbody { font-size: 10px }
            /*.result-section { page-break-before: always; break-before: page;}*/
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWin!.document.close();
  }
  

   // ตรวจสอบผลการตรวจว่าผิดปกติหรือไม่ 
   isAbnormalResult(item: any): boolean {   
   if(item.abnormal_result === "Y"){
    return true;
   }
    return false;
  }

}
