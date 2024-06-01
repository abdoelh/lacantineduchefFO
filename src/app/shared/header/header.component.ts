import { Component, OnInit } from '@angular/core';
import { IsloggedinService } from '../../../services/isloggedin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app.routes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AppRoutingModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  receivedBoolean: boolean = false;
  idOrga:any;
  userId:any;
  isLogged: boolean = false;
  username: any;
  constructor(private sharedService: IsloggedinService, private router: Router) {}
  ngOnInit(): void {
    this.sharedService.getIsLoggedIn().subscribe((status: boolean) => {
      this.isLogged = status;
    });

    const localData = localStorage.getItem("user");
    if(localData==="1"){
      this.isLogged = true;
      this.username = localStorage.getItem('username');
      console.log(this.username)
    }else{
      this.isLogged =  false;
    }
  
  }

  toggleLoginStatus(): void {
    this.sharedService.setIsLoggedIn(!this.isLogged);
  }

logout(): void {
  // Clear the local storage item
  localStorage.removeItem('user');
  localStorage.removeItem('orgaId');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');

  // Update the shared service to reflect the user is logged out
  this.sharedService.changeData(false);
  // Redirect to the login page
  this.router.navigate(['login']);
  this.isLogged = false
}

}
