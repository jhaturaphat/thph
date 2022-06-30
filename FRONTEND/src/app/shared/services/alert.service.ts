import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(text:string):any {
    return this.snackBar.open(text, 'X', {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 4000,      
    });
  }
}
