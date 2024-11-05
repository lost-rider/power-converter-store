import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';  // Usually needed alongside MatFormFieldModule
import { HttpClient } from '@angular/common/http';
import {
  ApexAxisChartSeries, NgApexchartsModule,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,

  ApexStroke,
  
} from 'ng-apexcharts';
@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [NgApexchartsModule, MenuComponent, IonicModule, CommonModule, FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent implements OnInit {
  isOpen = false;
  form: FormGroup;
  selectedValue: string | null = null;
  converterType: string | null = null;
  dcdcType:string | null=null;
  priorityValue: string = '';
  priorityValue1: string = '';
  priorityValue2: string = '';
  x: any;
  po: any;
  vd: any;
  vo: any;
  f: any;
  res: Number;
  score: any;
  chk: boolean = false;
  options: string[];
  isOpen1 = false;
  isOpen2 = false;
  isOpen3 = false;
  isConverter=false;
  isDcdc=false;

  public chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
  };

  constructor(private http: HttpClient, private fb: FormBuilder,) {

    this.chartOptions = {
      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40, 100, 20]
          //Number(this.res) ||
        }
      ],
      chart: {
        height: 350,
        type: 'radar'
      },
      title: {
        text: ''
      },
      xaxis: {
        categories: ['Ind_value', 'Cost', 'Current Rating', 'Power rating', 'Output v', 'Input v']
      },
      stroke: {
        width: 2
      }
    };

    this.res = 1;
    this.score = 0;
    this.options = ['I', 'II', 'III'];
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
  price: any;



  ngOnInit() {
    this.http.get("http://127.0.0.1:8000/product").subscribe(
      (data: any) => {
        this.obj = data;
        this.products = this.obj.products;


        // Assuming you want to calculate the score based on price
        this.products.forEach(product => {
          if (product.price !== 'NA') {
            product.score += Math.pow(10, 4 - (this.priorityValue2).length);
          }
          if (product.value !== 'NA') {
            product.score += Math.pow(10, 4 - (this.priorityValue).length);
          }
          if (product.current_rating !== 'NA') {
            product.score += Math.pow(10, 4 - (this.priorityValue1).length);
          }
        });
        this.products.sort((a, b) => {
          if (b.score === a.score) {
            // if(a.value1===b.value1){
            //   return a.value2-b.value2;
            // }
            // else{
            return a.value1 - b.value1;
            //} // Sort by value1 if scores are equal
          } else {
            return b.score - a.score; // Sort by score in descending order
          }
        });

      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }



  toggleDropdown() {
    this.isOpen = !this.isOpen
  }

  toggleConverter(){
    this.isConverter=!this.isConverter
  }
  toggleDcdc(){
    this.isDcdc=!this.isDcdc
  }
  toggleDropdown1() {
    this.isOpen1 = !this.isOpen1
  }
  toggleDropdown2() {
    this.isOpen2 = !this.isOpen2
  }
  toggleDropdown3() {
    this.isOpen3 = !this.isOpen3
  }
  selectConverter(value: string) {
    this.converterType = value;
    this.isConverter = false;
  }
  selectDcdc(value: string) {
    this.dcdcType = value;
    this.isDcdc = false;
  }
  selectItem(value: string) {
    this.selectedValue = value;
    this.isOpen = false;
  }
  selectItem1(value: string) {
    this.priorityValue = value;
    this.isOpen1 = false;
  }
  selectItem2(value: string) {
    this.priorityValue1 = value;
    this.isOpen2 = false;
  }
  selectItem3(value: string) {
    this.priorityValue2 = value;
    this.isOpen3 = false;
  }
  calculate() {

    


    this.x = this.form.get('a')?.value;
    this.po = this.form.get('c')?.value;
    this.vd = this.form.get('b')?.value;
    this.vo = this.form.get('d')?.value;
    this.f = this.form.get('e')?.value;
    if (this.x && this.vd && this.vo && this.f) { // Ensure all values are present and valid
      this.res = ((this.vd - this.vo) * this.vo) / (2 * this.x * this.vd * this.f * this.f);
      console.log(this.res);
      this.chk = true;
    } else {
      console.log('Please ensure all inputs are filled correctly.');
    }
  }

  goBack() {
    // Resetting `converterType` goes back to converter selection
    this.converterType = null;
    this.dcdcType = null;
  }

  goBackToConverter() {
    // Resetting `dcdcType` goes back to DC-DC converter selection
    this.dcdcType = null;
    this.selectedValue = null;
  }
}
