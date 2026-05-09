import { Component } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-url-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './url-list.component.html',
  styleUrl: './url-list.component.css'
})
export class UrlListComponent {
  tinyUrlDetails:any[] = [];
  urlPrefix: string = "https://localhost:7125/api/";
  url: string = "https://localhost:7125/";
  subscription!: Subscription;


constructor(private urlService: UrlService, private sharedService: SharedService){
}
ngOnInit(){
   this.urlService.urlList$
    .subscribe(response => {

      this.tinyUrlDetails = response;

      console.log(response);

    });

  this.urlService.getUrls();
  this.subscription = this.sharedService.pageRefresh$.subscribe({
  next:(refresh)=>{
    if(refresh){
      this.getUrls();
    }
  }
});

}

getUrls(){
  this.urlService.getUrls();
}
copyToClipboard(shortCode: string): void {
    navigator.clipboard.writeText(this.url + shortCode);
    alert('Copied to clipboard');
  }

  deleteUrl(id:number){
    if(confirm('Are you sure you want to delete this URL?')){
      this.urlService.delete(id).subscribe({
        next:(res)=>{
          alert('URL deleted successfully');
          this.getUrls();
        },error(err){
          console.log(err);
        }
      })
    }
  }
  redirectUrl(shortCode: string){
    this.urlService.redirectUrl(shortCode).subscribe({
      next:(res:any) =>{
         if (!res.originalUrl.startsWith('http://') &&
          !res.originalUrl.startsWith('https://')) {

        res.originalUrl = 'https://' + res.originalUrl;
      }
        window.open(res.originalUrl, '_blank');
      }
    })

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
