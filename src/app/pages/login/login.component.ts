import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { IsloggedinService } from '../../../services/isloggedin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  client: any;
  errorMessage: string = '';
  clientIfo:any;

  constructor(private formBuilder: FormBuilder,private router: Router, private clientService: ClientService, private islogged: IsloggedinService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    console.log('Form Value');

    if (this.loginForm.valid) {
      console.log('Form Value', this.loginForm.value);
      const username = this.loginForm.get('username')?.value;

      // Fetch the client and check password in the subscription callback
      this.getClient(username);
    }
  }

  getClient(id: number): void {
    console.log(id)
    this.clientService.getClient(id).subscribe(
      data => {
        this.client = data;
        this.clientIfo = this.client.data
        this.client = this.client.data.attributes;
        console.log('Redirect now', this.client);

        this.verifyPassword();
      },
      error => {
        console.error('Error fetching client', error);
        // Handle error fetching client
      }
    );
  }

  verifyPassword(): void {
    if (this.client && this.client.password === this.loginForm.get('password')?.value) {
      console.log('Redirect now', this.client.organization.data.attributes.name);
        localStorage.setItem("user","1")
        // localStorage.setItem("userId",this.clientIfo.id)
        // localStorage.setItem("orgaId",this.client.organization.data.id)

        localStorage.setItem('userId', this.clientIfo.id);
    localStorage.setItem('orgaId', this.client.organization.data.id);
    console.log(this.client.organization.data)
    console.log(this.client.lastName)

    localStorage.setItem('username', this.client.lastName);
      console.log(this.client.organization.data.name)     
    //  this.sendData();
      this.islogged.setIsLoggedIn(true);
      this.router.navigate(['menu']); // Redirect to home on successful login

    } else {
      localStorage.setItem("user","0")

      this.islogged.setIsLoggedIn(false); // Update shared service

      console.log('OUPS');
    }
  }
  sendBoolean() {
    this.islogged.changeData(true);
  }

  
}
