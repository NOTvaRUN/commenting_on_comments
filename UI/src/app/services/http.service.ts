import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  private host = 'localhost';
  private port = '3000'
  private apiVersion = '/api/v1'

  getComments() {
    return this.http.get<any>(`http://${this.host}:${this.port}${this.apiVersion}/comment/list`);
  }

  addComments(data: any) {
    return this.http.post<any>(`http://${this.host}:${this.port}${this.apiVersion}/comment/add`, data);
  }

  updateComments(data: any) {
    return this.http.post<any>(`http://${this.host}:${this.port}${this.apiVersion}/comment/update`, data);
  }
}
