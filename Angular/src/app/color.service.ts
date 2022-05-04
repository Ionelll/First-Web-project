import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColorModel } from './color.model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({providedIn: 'root'})

export class ColorService {
  constructor(private http: HttpClient) {}

  private coloradded = new Subject<ColorModel>();
  private colorsearched = new Subject<ColorModel>();
  private newName = new Subject<ColorModel>();
  private colornames = new Subject<any>();

  getcoloradded(): Observable<ColorModel>{
    return this.coloradded.asObservable();
  }

  getcolorsearched(): Observable<ColorModel>{
     return this.colorsearched.asObservable();
  }
  getnewName(): Observable<ColorModel>{
    return this.newName.asObservable();
  }
  getcolornames(): Observable<string[]>{
    this.names();
    return this.colornames.asObservable();
  }

  names(): void{
    this.http.get<string[]>(`${environment.apiUrl}/colornames`).subscribe((data: string[]) => {
      this.colornames.next(data);
    });
  }

  addColor(colorname: string): void {
    const color = { name: colorname, embanew: '0', embamixed: '0', simcanew: '0', simcamixed: '0' };
    this.http.post<ColorModel>(`${environment.apiUrl}/addcolor`, color).subscribe(data => {
      this.coloradded.next(data);
    });  }

  searchColor(nume: string): void{
    this.http.get<ColorModel>(`${environment.apiUrl}/searchcolor/${nume}`).subscribe(data => {
      this.colorsearched.next(data);
    });
  }

  updateColor(color: ColorModel): void{
    this.http.put<ColorModel>(`${environment.apiUrl}/update`, color).subscribe();
  }

  deleteColor(name: string): void{
    this.http.delete(`${environment.apiUrl}/delete/${name}`).subscribe();
  }
  changeName(oldname: string, newname: string): void {
    this.http.put<ColorModel>(`${environment.apiUrl}/changename/${oldname}/${newname}`, null).subscribe(data => {
    this.newName.next(data);
  });
}
}
