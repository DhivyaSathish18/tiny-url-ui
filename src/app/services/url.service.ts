import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  api = "https://localhost:7125/api";
  constructor(private http: HttpClient) { }

  private urlListSubject = new BehaviorSubject<any[]>([]);

  urlList$ = this.urlListSubject.asObservable();
  
  create(data:any){
    return this.http.post(`${this.api}/shortenUrl`, data);
  }

  getUrls(){
    return this.http.get(`${this.api}/urls`).subscribe((response:any) => {

        this.urlListSubject.next(response);

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
