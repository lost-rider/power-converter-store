import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule}  from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';  // Usually needed alongside MatFormFieldModule
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [MenuComponent,IonicModule,CommonModule, FormsModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent implements OnInit{
  isOpen=false;
  form: FormGroup ;
  selectedValue: string | null = null;
  x: any;
  po: any;
  vd: any;
  vo: any;
  f: any;
  res: Number ;
  
  
  constructor(private http: HttpClient,private fb: FormBuilder){
    this.res=1;
    this.form = this.fb.group({  // Initialize form in constructor
      a: [''],
      b: [''],
      c: [''],
      d: [''],
      e: [''],

    });
  }
  obj: any;
products: any[] = [];



ngOnInit() {
  this.http.get("http://127.0.0.1:8000/product").subscribe(
    (data: any) => {
      this.obj = data;
      this.products = this.obj.products;
    },
    error => {
      console.error('Error fetching data:', error);
    }
  )

}
  
  
  toggleDropdown(){
    this.isOpen=!this.isOpen
  }
  selectItem(value: string) {
    this.selectedValue = value;
    this.isOpen = false;
  }

  calculate(){
    this.x=this.form.get('a')?.value;
    this.po=this.form.get('c')?.value;
    this.vd=this.form.get('b')?.value;
    this.vo=this.form.get('d')?.value;
    this.f=this.form.get('e')?.value;
    if (this.x && this.vd && this.vo && this.f) { // Ensure all values are present and valid
      this.res = ((this.vd - this.vo) * this.vo) / (2 * this.x * this.vd * this.f * this.f);
      console.log(this.res);
    } else {
      console.log('Please ensure all inputs are filled correctly.');
    }
  }
}
