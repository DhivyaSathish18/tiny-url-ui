import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  api = "https://localhost:5001";
  constructor(private http: HttpClient) { }

  create(data:any){
    return this.http.post(`${this.api}/api/shorten`, data);
  }

  getUrls(){
    return this.http.get(`${this.api}/api/urls`);
  }
  
  delete(id: number){
    return this.http.delete(`${this.api}/${id}`);
  }
  search(query: string){
    return this.http.get(`${this.api}/search?query=${query}`);
  }
}
