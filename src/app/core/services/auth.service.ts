import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { isTokenExpired } from '../utils/jwt.utils';
import { AuthRequest, AuthResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'auth_token';
  private readonly userSubject = new BehaviorSubject<string | null>(
    this.getToken()
  );

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.userSubject.next(token);
  }

  public signin(userData: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/Users/login`, userData)
      .pipe(
        tap((response: AuthResponse) => {
          if (response && response.jwtToken) {
            this.setToken(response.jwtToken);
          }
        })
      );
  }

  public autoLogin(): void {
    const token = this.getToken();

    if (token) {
      this.userSubject.next(token);
    }
  }

  
  public logout(): void {
    localStorage.removeItem(this.tokenKey);

    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    return !isTokenExpired(token);
  }
}
