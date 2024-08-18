import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule}  from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';  // Usually needed alongside MatFormFieldModule
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [MenuComponent,IonicModule,CommonModule, FormsModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent implements OnInit{
  isOpen=false;
  selectedValue: string | null = null;
  
  constructor(private http: HttpClient){}
  obj: any;
products: any[] = [];



ngOnInit(): void {
  this.http.get("http://127.0.0.1:8000/product").subscribe(
    (data: any) => {
      this.obj = data;
      this.products = this.obj.products;
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
}
  
  
  toggleDropdown(){
    this.isOpen=!this.isOpen
  }
  selectItem(value: string) {
    this.selectedValue = value;
    this.isOpen = false;
  }
}
