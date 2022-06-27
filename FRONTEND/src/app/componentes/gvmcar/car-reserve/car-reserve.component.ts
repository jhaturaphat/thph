import { GvmcarService } from './../../../services/gvmcar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-reserve',
  templateUrl: './car-reserve.component.html',
  styleUrls: ['./car-reserve.component.css']
})
export class CarReserveComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private GvmcarService:GvmcarService
    ) {

    this.myForm = this.fb.group({
      gvmcar_rsv_num_of_ple:['', Validators.required],
      gvmcar_rsv_trip_job:['', Validators.required],
      gvmcar_rsv_trip_detail:['', Validators.required],
      gvmcar_rsv_start_date:['', Validators.required],
      gvmcar_rsv_end_date:['', Validators.required],
    });
  }

  myForm:FormGroup

  ngOnInit(): void {
  }

  gvmSave():void {
    console.log(this.myForm.value);  
    this.GvmcarService.save(this.myForm.value).then(result=>{
      console.log(result);      
    }).catch(err=>console.log(err));
  }

}
