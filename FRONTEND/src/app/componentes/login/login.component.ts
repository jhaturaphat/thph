import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AppUrl } from 'src/app/URL';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fg:FormGroup;
  error:boolean = false;

  constructor(
    private fBulider:FormBuilder,
    private login:LoginService,
    private alert:AlertService,
    private router:Router,    
  ) {
    this.fg = this.fBulider.group({
      'userid': ['', Validators.required], 
      'pass': ['', Validators.required] 
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.fg.value);
    this.login.onLogin(this.fg.value).then((res:any) => {                                      
          this.login.setToken(res.token);     
          this.router.navigate(['/', AppUrl.Labview]);
      }
  ).catch((err)=>{    
      this.alert.openSnackBar(err.error.message);
  } )
  }

}
