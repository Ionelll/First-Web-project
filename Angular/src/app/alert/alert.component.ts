import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alerts',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  constructor( public snackbar: MatSnackBar) { }
openSnackBar({ message, action, className }: { message: any; action: string; className: string; }): void{
  this.snackbar.open(message, action, {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'center',
    panelClass: className

  });
}
}
