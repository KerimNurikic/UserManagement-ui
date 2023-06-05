import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public loginValid = true;
  public username = '';
  public password = '';
  constructor() {}

  ngOnInit(): void {}

  public onSubmit(): void {
  }
}
