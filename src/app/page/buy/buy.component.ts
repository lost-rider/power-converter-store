import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule}  from '@angular/material/icon';
@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [MenuComponent,IonicModule,CommonModule, FormsModule,MatButtonModule,MatIconModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent {
  isOpen=false;
  selectedValue: string | null = null;
  toggleDropdown(){
    this.isOpen=!this.isOpen
  }
  selectItem(value: string) {
    this.selectedValue = value;
    this.isOpen = false;
  }
}
