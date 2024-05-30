import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { IsloggedinService } from '../../../services/isloggedin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  receivedBoolean: boolean = false;

  constructor(private sharedService: IsloggedinService) {}
ngOnInit(): void {
  this.sharedService.currentData.subscribe((value: boolean) => {
    this.receivedBoolean = value;
    console.log('Header received new value:', value);
  });

}

}
