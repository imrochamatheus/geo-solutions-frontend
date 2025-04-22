import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http:HttpClient) { }

  public register(body: Register): Observable<void>{
   return  this.http.post<void>(`${environment.apiUrl}/Users`, body)
  }
}
