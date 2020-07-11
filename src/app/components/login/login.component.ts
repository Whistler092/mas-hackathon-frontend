import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public profile = '0';
  private routes = ['/recorder', '/receptor'];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.router.navigate([this.routes[this.profile]]);
    console.log(this.profile);
  }
}
