import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ColorService } from '../color.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colorselevation.component.sass']
})
export class ColorsComponent implements OnInit {

  options: string[] = [];
  myControl = new FormControl();
  filteredoptions = new Observable<string[]>();

  constructor( public colorservice: ColorService) {

}

onAddColor(form: NgForm): void{
  this.colorservice.getcolornames().subscribe(data => {
    this.options = data;
  });
  if (form.invalid){
    return; }
  else{
    this.colorservice.addColor(form.value.addcolorinput);
    form.resetForm();
    }
}
onSearchColor(): void{
  if (!this.myControl.valid){
    return; }
  else{
    this.colorservice.searchColor(this.myControl.value);
    this.myControl.reset('');

  }
}


  ngOnInit(): void {
    this.colorservice.getcolornames().subscribe(data => {
      this.options = data;
    });
    this.filteredoptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value;
    return this.options.filter(option => option.toLowerCase().includes(filterValue.toLowerCase()));
  }
}
