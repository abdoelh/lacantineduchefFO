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
  constructor(private sharedService: IsloggedinService, private router: Router) {}
  ngOnInit(): void {
    this.sharedService.getIsLoggedIn().subscribe((status: boolean) => {
      this.isLogged = status;
    });
  }

  toggleLoginStatus(): void {
    this.sharedService.setIsLoggedIn(!this.isLogged);
  }

logout(): void {
  // Clear the local storage item
  localStorage.removeItem('user');
  // Update the shared service to reflect the user is logged out
  this.sharedService.changeData(false);
  // Redirect to the login page
  this.router.navigate(['login']);
  this.isLogged = false
}

}
