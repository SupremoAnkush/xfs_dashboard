import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dashboard } from './dashboard';
import { Observable } from 'rxjs';

 
@Injectable()
export class ServicesService {
 
  private usersUrl: string;
 
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://18.188.202.13:8080/ManisaSpringSample/users';
  }
 
  public findAll(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.usersUrl);
  }
}