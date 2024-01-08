import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  public userDetails:User[]=[]
  addUser(details:User){
    this.userDetails.push(details)
    console.log(this.userDetails)
  }
  checkValid(name:string):string|boolean{
    if(isNaN(parseInt(name))) return name.toLowerCase()
    else return false
  }
  getUsers():User[]{
    return this.userDetails;

  }
  findUserValidOrNot(name:string,password:string):boolean{
    let filteredList=this.userDetails.filter(user=> user.userName==name && user.password==password)
    if(filteredList.length===1) return true
    else return false
  }
}
