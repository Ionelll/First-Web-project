import { Component, OnInit } from '@angular/core';
import { ColorService } from '../color.service';
import { ColorModel } from '../color.model';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./resultselevatin.component.sass']
})
export class ResultsComponent implements OnInit{

  constructor(public colorservice: ColorService, private snackbar: AlertComponent) {}
  color = 'Farbe';
  embanew = '';
  embamixed = '';
  simcanew = '';
  simcamixed = '';
  newname = '';

  ngOnInit(): void {


    this.colorservice.getcolorsearched().subscribe((body: ColorModel) => {
      this.color = body.name;
      this.embanew = body.embanew;
      this.embamixed = body.embamixed;
      this.simcanew = body.simcanew;
      this.simcamixed = body.simcamixed;
      });

    this.colorservice.getcoloradded().subscribe((body: ColorModel) => {
      this.color = body.name;
      this.embanew = body.embanew;
      this.embamixed = body.embamixed;
      this.simcanew = body.simcanew;
      this.simcamixed = body.simcamixed;
      });

    this.colorservice.getnewName().subscribe((value: ColorModel) => {
      console.log(value);
      this.color = value.name;
      this.newname = '';
      });

}
onsaveMenge(): void{
  if (this.color === 'Farbe' ){ return; }
  else{
  const colorobj = new ColorModel();
  colorobj.name = this.color;
  colorobj.embanew = this.embanew;
  colorobj.embamixed = this.embamixed;
  colorobj.simcanew = this.simcanew;
  colorobj.simcamixed = this.simcamixed;
  console.log(colorobj);
  this.colorservice.updateColor(colorobj);
  this.snackbar.openSnackBar({message: 'Mengen gespeichert!', action: 'Close', className: 'success'});
}
}
onDeleteColor(): void{
  if (this.color === 'Farbe'){
    return;
  }
  else{
    this.colorservice.deleteColor(this.color);
    this.color = 'Farbe';
    this.embanew = '';
    this.embamixed = '';
    this.simcanew = '';
    this.simcamixed = '';
   }
}
onChangeName(): void{
  if (this.newname === '' || this.color === 'Farbe'){return; }
  else{
  this.colorservice.changeName(this.color, this.newname);
  }

}

}

