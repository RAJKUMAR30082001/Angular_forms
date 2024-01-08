import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username:string=''
  public password:string=''
  // public flagToGivePermission:boolean=false
  constructor(private service:UserServiceService,private router:Router) {}
  submit(){
    if(this.service.findUserValidOrNot(this.username,this.password)){
      this.navigateTohome()
    }
    else{
      alert("enter correct detail")
    }
  }
  navigateTohome(){
    this.router.navigate(['/profile',this.username]);
  }
}
