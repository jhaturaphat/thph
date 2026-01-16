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

  ngOnInit(): void {
    console.log('ข้อมูลที่รับมา:', this.data);
  }


}
