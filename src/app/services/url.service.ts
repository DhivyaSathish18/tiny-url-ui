import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  api = "https://tinyurl-api-f7d6avd9b7dtana3.centralindia-01.azurewebsites.net/api";
  constructor(private http: HttpClient) { }

  private urlList = new BehaviorSubject<any[]>([]);

  urlList$ = this.urlList.asObservable();
  
  create(data:any){
    return this.http.post(`${this.api}/shortenUrl`, data);
  }

  getUrls(){
    return this.http.get(`${this.api}/urls`).subscribe((response:any) => {

        this.urlList.next(response);

      });;
  }
  
  delete(id: number){
    return this.http.delete(`${this.api}/${id}`);
  }
  search(query: string){
    return this.http.get(`${this.api}/search?query=${query}`);
  }
  redirectUrl(shortCode: string){
     return this.http.get<any>(`${this.api}/${shortCode}`).pipe(

    tap(() => {

      this.getUrls();

    })

  );
  }
}
