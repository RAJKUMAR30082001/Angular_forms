import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { User } from '../user';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  public usernameExit:boolean=false
  public userEmailExit:boolean=false

  constructor(private fb: FormBuilder,private eleRef:ElementRef,private render:Renderer2,private service:UserServiceService) {}
  

  checkUsernameExit(name:string):string{
   
    let isExist =this.service.getUsers().filter((val)=> val.userName==name)
    if(isExist.length==0) return name
    else {
      this.usernameExit=true
      return ''
    }
  }
  checkEmailExit(mail:string):string{
    
    let isExist = this.service.getUsers().filter((val)=> val.email===mail)
    if(isExist.length==0) return mail
    else {
      this.userEmailExit=true
      return ''
    }
  }

  ngOnInit(): void {
    
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  addElement(name:string){
  
    const myElement = this.eleRef.nativeElement.querySelector('.alert');
    if(name!=''){
    let firstElement=`<strong>${name}</strong><br>`
    let elementValue=myElement.innerHTML
    this.render.setProperty(myElement, 'innerHTML', firstElement+elementValue);
   
    }
    else{
      this.render.setProperty(myElement,'innerHTML'," ")
    }
  }
  onSubmit() {
  
    this.addElement('')
    if (this.registerForm.valid) {
      let details:User={
        name : this.service.checkValid(this.registerForm.value.name),
        password : this.registerForm.value.password,
        email : this.checkEmailExit(this.registerForm.value.email),
        userName:this.checkUsernameExit (this.registerForm.value.username)
      }
      if(this.userEmailExit ){
        this.addElement('email id already exists')
        this.userEmailExit=false
      }
      if(this.usernameExit){
        this.addElement('username already exist')
        this.usernameExit=false
      }
      else{
       
        this.service.addUser(details)
        this.registerForm.reset()
      }
    } 
   }
}

