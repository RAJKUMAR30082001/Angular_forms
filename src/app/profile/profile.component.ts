import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  public Username:string=''
  constructor(private router:ActivatedRoute){}
  ngOnInit(): void {
    this.Username=this.router.snapshot.params['name']
  }

}
