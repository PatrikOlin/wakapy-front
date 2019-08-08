import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  baseURL = 'http://localhost:5000/';

  getStats(username: string): Observable<any> {
    const url = `${this.baseURL}stats/${username}`;

    return this.http.get('../../assets/mockData.json');
    //return this.http.get(url);
  }
}
