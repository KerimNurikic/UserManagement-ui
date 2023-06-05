import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZenturyApiService } from '../zentury-api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public loginValid = true;
  public username = '';
  public password = '';
  constructor(private userService: ZenturyApiService, private router: Router) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    this.userService.signIn(this.username, this.password).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
          this.loginValid = true;
        }
      },
      (error) => {
        this.loginValid = false;
      }
    );
  }
}
