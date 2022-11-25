import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fg:FormGroup;
  error:boolean = false;

  constructor(
    private fBulider:FormBuilder
  ) {
    this.fg = this.fBulider.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.fg.value);
    
  }

}
