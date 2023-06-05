import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResource } from './users/user-resource';
import { User } from './users/user';
import { LoginResource } from './login/log-in-resource';

@Injectable({
  providedIn: 'root',
})
export class ZenturyApiService {
  readonly zenturyUrl = 'https://localhost:7073/zentury';

  constructor(private http: HttpClient) {}

  getAllUsersPaginated(usersResource: UserResource): Observable<any> {
    let params = new HttpParams();
    params = params.append('PageIndex', usersResource.PageIndex);
    params = params.append('PageSize', usersResource.PageSize);
    params = params.append('FirstName', usersResource.FirstName);
    params = params.append('LastName', usersResource.LastName);
    params = params.append('Email', usersResource.Email);
    params = params.append('SortOrder', usersResource.SortOrder);

    return this.http.get<any>(this.zenturyUrl + '/users', { params: params });
  }

  getAllLoginsPaginated(loginResource: LoginResource): Observable<any> {
    let params = new HttpParams();
    params = params.append('PageIndex', loginResource.PageIndex);
    params = params.append('PageSize', loginResource.PageSize);
    params = params.append('Email', loginResource.Email);
    params = params.append('SortOrder', loginResource.SortOrder);

    return this.http.get<any>(this.zenturyUrl + '/logins', { params: params });
  }

  addUser(user: User) {
    return this.http.post(this.zenturyUrl + '/adduser', user);
  }
}
