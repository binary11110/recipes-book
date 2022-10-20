import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {
  isAuthenticated :boolean = false;
  private userSub!:Subscription;
  constructor(private dataService:DataStorageService,private authServ:AuthService) { }

  ngOnInit(): void {
   this.userSub = this.authServ.user.subscribe(user => {
    this.isAuthenticated = user.email == '' ? false:true;
   })
   
  }
  onLogout(){
    this.authServ.logout()
  }

  onSave(){
this.dataService.onStoreData();
  }

  onFetch(){
    this.dataService.onFetchData();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
