import { GvmcarService } from './../../../services/gvmcar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IGvmCarRsv } from '../gvmcar.interface';

@Component({
  selector: 'app-car-reserve',
  templateUrl: './car-reserve.component.html',
  styleUrls: ['./car-reserve.component.css']
})
export class CarReserveComponent implements OnInit {

  myForm:FormGroup;
  panelOpenState:boolean = false;
  gvmCarRsv:IGvmCarRsv[] = [];
  hidden = false;

  constructor(
    private fb:FormBuilder,
    private GvmcarService:GvmcarService,
    private alert:AlertService
    ) {

    this.myForm = this.fb.group({
      gvmcar_rsv_num_of_ple:['', Validators.required],
      gvmcar_rsv_trip_job:['', Validators.required],
      gvmcar_rsv_trip_detail:['', Validators.required],
      gvmcar_rsv_start_date:['', Validators.required],
      gvmcar_rsv_end_date:['', Validators.required],
    });
  }

  

  ngOnInit(): void {
    this.GvmcarService.findAll().then(result=>{
      console.log(result);      
      this.gvmCarRsv = result;  
    }).catch(err=>{
      this.alert.openSnackBar(err.message);
      console.log(err);
    })
  }

  gvmSave():void {
    if(!this.myForm.valid) this.alert.openSnackBar('กรุณากรองข้อมูล');    
    let valueF = this.myForm.value;
    this.myForm.value['gvmcar_rsv_start_date'] = this.tranFromDate(this.myForm.value['gvmcar_rsv_start_date']);
    this.myForm.value['gvmcar_rsv_end_date'] = this.tranFromDate(this.myForm.value['gvmcar_rsv_end_date']);
    this.GvmcarService.save(valueF).then(result=>{
      this.alert.openSnackBar("บันทึกสำเร็จ"); 
    }).catch(err=>{
      this.alert.openSnackBar(err.message);
      console.log(err);
    });
  }

  tranFromDate(date:Date):string{
    return new Date(date).toISOString().slice(0, 10).toString();
  }

  dateToThai(date:any){
    return new Date(date).toLocaleDateString('th-TH', {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    })
  }

}
