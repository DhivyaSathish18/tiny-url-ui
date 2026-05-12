import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  api = environment.apiPrefix;
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
  
  delete(id: number, code:string){ 
    const token = localStorage.getItem(`token_${code}`);
    return this.http.delete(`${this.api}/delete/${id}?token=${token}`);
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
