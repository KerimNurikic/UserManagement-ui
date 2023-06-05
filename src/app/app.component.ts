import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Zentury Task';

  constructor(private router: Router){}

  logOut(){
    localStorage.setItem('token','');
    this.router.navigate(['signin']);
  }
}
