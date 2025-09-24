import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password_hash: string): Observable<any> {
    return this.http.post('https://back-end-ue8w.onrender.com/api/login', {
      username,
      password_hash
    });
  }
}