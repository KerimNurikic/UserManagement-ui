import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Login } from './log-in';
import { ZenturyApiService } from '../zentury-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pageSize = 10;
  pageIndex = 0;
  disabled = false;
  hidePageSize = true;
  sortOrder = '';

  email = '';

  logins: Login[] = [];
  totalItemsCount: number = 0;


  sorts: any[] = [
    { value: 'email', viewValue: 'Email' },
    { value: 'email_desc', viewValue: 'Email descending' },
  ];


  filterValues: any[] =[
    ''
  ]

  displayedColumns: string[] = [
    'email',
    'date',
    'status'
  ];

  dataSource = [];

  constructor(private usersService: ZenturyApiService) { }

  ngOnInit(): void {
    this.updateLoginsList();
  }

  updateLoginsList(): void {
    this.usersService
      .getAllLoginsPaginated({
        Email: this.email,
        PageIndex: this.pageIndex,
        PageSize: this.pageSize,
        SortOrder: this.sortOrder,
      })
      .subscribe((res) => {
        this.dataSource = res.logins;
        this.totalItemsCount = res.totalItemsCount;
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.updateLoginsList();
  }

  filter(): void {
    this.email = this.filterValues[0];
    this.clearPagination();
    this.updateLoginsList();
  }

  clearFilter(): void {
    for (let i = 0; i < this.filterValues.length; i++)
      this.filterValues[i] = '';
    this.email = this.filterValues[0];

    this.updateLoginsList();
  }

  clearPagination(): void {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.sortOrder = '';
  }

  sort(): void {
    this.updateLoginsList();
  }

  columnName(columnName: string): string {
    if (columnName === 'email') return 'Email';
    if (columnName === 'date') return 'Date';
    if (columnName === 'status') return 'Status';

    return columnName;
  }
  

}
