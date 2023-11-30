import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILabview } from 'src/app/interfaces/labview.interface';
import { HisLabService } from 'src/app/services/his.lab.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lab-view',
  templateUrl: './lab-view.component.html',
  styleUrls: ['./lab-view.component.css']
})
export class LabViewComponent implements OnInit {

  public loading: boolean = false;
  myForm:FormGroup;  
  labResult:ILabview[] = [];

  constructor(
    private fb:FormBuilder, 
    private labService:HisLabService,
    private alert:AlertService,
    private router:Router
    ) {
      
    this.myForm = this.fb.group({
      lab_start_date:['', Validators.required],
      lab_end_date:['', Validators.required],
    });
   
   }

  ngOnInit(): void {}

 
  async labReport(){
    this.loading = true;
      
    if(!this.myForm.value['lab_start_date']){
      this.loading = false;
      this.router.navigate(['login']);
      return;
    } 
    const start_d = new Date(this.myForm.value['lab_start_date'])//.toISOString().slice(0, 10);
    const end_d = new Date(this.myForm.value['lab_end_date'])//.toISOString().slice(0, 10);

    const start_date = new Date(start_d.setDate(start_d.getDate() + 1)).toISOString().slice(0, 10);;
    const end_date = new Date(end_d.setDate(end_d.getDate() + 1)).toISOString().slice(0, 10);
    console.log("start_date ",start_date, "end_date ", end_date);  
    
    await this.labService.find(start_date, end_date).then(res => {
      this.loading = false;
      this.labResult = res;
      console.log(this.labResult);      
    }).catch (err => {
      this.loading = false; 
      this.alert.openSnackBar(err.error.message);
      // alert(err.error.message);     
      console.log(err);      
    });    
  }

  cancelReport():void {
    this.loading = false;
  }

  

  exportExcel():void{
    /* pass here the table id */    
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.labResult);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
  }

}

