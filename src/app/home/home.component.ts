import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(path: String): void{
    switch(path){
      case 'users':
        this.router.navigate(['users']);
        break;
      case 'logins':
        this.router.navigate(['logins']);
        break;
    }
  }

}
