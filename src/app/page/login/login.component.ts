import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm:any;
  signinForm:any;
  activeForm: 'login' | 'signin'= 'login'

  constructor(private fb: FormBuilder,
    private router:Router
  ){}
  ngOnInit(){
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['', Validators.required]
    });

    this.signinForm=this.fb.group({
      username:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['', Validators.required]
    });
    
  }
  toggleForm(form:'login' | 'signin' ){
    this.activeForm=form;
  }
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.router.navigate(['/page/dahboard']);

    }
    else{
      alert('Invalid username or password!');
    }
  }

  signin(){
    if(this.signinForm.valid){
      console.log(this.signinForm.value);
      setTimeout(()=>{
        window.location.reload();
      },2000);
      this.router.navigate(['/page/login']);

    }
    else{
      alert('Please fill all the fields correctly!');
    }
  }

}
