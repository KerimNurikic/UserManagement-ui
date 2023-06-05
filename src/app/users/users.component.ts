import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from './user';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ZenturyApiService } from '../zentury-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  disabled = false;
  hidePageSize = true;
  sortOrder = '';

  firstName = '';
  lastName = '';
  email = '';

  users: User[] = [];
  totalItemsCount: number = 0;

  filterValues: any[] = ['', '', ''];
  displayedColumns: string[] = ['email', 'firstName', 'lastName'];

  sorts: any[] = [
    { value: 'firstName', viewValue: 'First name' },
    { value: 'firstName_desc', viewValue: 'First name descending' },
    { value: 'lastName', viewValue: 'Last name' },
    { value: 'lastName_desc', viewValue: 'Last name descending' },
    { value: 'email', viewValue: 'Email' },
    { value: 'email_desc', viewValue: 'Email descending' },
  ];

  dataSource = [];

  constructor(
    public dialog: MatDialog,
    private usersService: ZenturyApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.updateUsersList();
  }

  updateUsersList(): void {
    this.usersService
      .getAllUsersPaginated({
        FirstName: this.firstName,
        LastName: this.lastName,
        Email: this.email,
        PageIndex: this.pageIndex,
        PageSize: this.pageSize,
        SortOrder: this.sortOrder,
      })
      .subscribe((res) => {
        this.dataSource = res.users;
        this.totalItemsCount = res.totalItemsCount;
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.updateUsersList();
  }

  columnName(columnName: string): string {
    if (columnName === 'firstName') return 'First name';
    if (columnName === 'lastName') return 'Last name';
    if (columnName === 'email') return 'Email';

    return columnName;
  }

  filter(): void {
    this.email = this.filterValues[0];
    this.firstName = this.filterValues[1];
    this.lastName = this.filterValues[2];
    this.clearPagination();
    this.updateUsersList();
  }

  clearFilter(): void {
    for (let i = 0; i < this.filterValues.length; i++)
      this.filterValues[i] = '';
    this.email = this.filterValues[0];
    this.firstName = this.filterValues[1];
    this.lastName = this.filterValues[2];

    this.updateUsersList();
  }

  clearPagination(): void {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.sortOrder = '';
  }

  sort(): void {
    this.updateUsersList();
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialog);

    dialogRef.afterClosed().subscribe((newUser) => {
      if (newUser) {
        this.usersService.addUser(newUser).subscribe((res) => {
          this._snackBar.open("User successfully added!", 'Close');

          this.clearPagination();
          this.clearFilter();
        });
      } else {
        console.log(newUser);
      }
    });
  }
}

@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user-dialog.html', //,
  styleUrls: ['./add-user-dialog.scss'],
  //standalone: true,
})
export class AddUserDialog {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  emailControl = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(20)]);
  firstNameControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  lastNameControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  passwordControl = new FormControl('', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{0,}$'), Validators.maxLength(20), Validators.minLength(6)]);

  constructor(public dialogRef: MatDialogRef<AddUserDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close({
      firstName: this.firstName,
      lastname: this.lastName,
      email: this.email,
      password: this.password,
    });
  }
}
