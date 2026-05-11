import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UrlListComponent } from '../url-list/url-list.component';
import { UrlService } from '../../services/url.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [CommonModule, UrlListComponent, ReactiveFormsModule],
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.css'
})
export class UrlFormComponent {

  tinyUrlForm: FormGroup;
  isError: boolean = false;
  shortUrlGenerated: boolean = false;
  urlPrefix: string = "https://localhost:7125/";
  generatedUrl: string = "";
  originalUrl:string = "";

  constructor(private fb: FormBuilder, private urlService: UrlService, private sharedService: SharedService) {
    this.tinyUrlForm = this.fb.group({
      originalUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      isPrivate: [false]
    })
  }
  OnSubmit() {
    if (this.tinyUrlForm.valid) {
      this.isError = false;
      console.log(this.tinyUrlForm.value);
      this.shortUrlGenerated = true;

      const payload = {
        originalUrl: this.tinyUrlForm.value.originalUrl,
        isPrivate: this.tinyUrlForm.value.isPrivate
      }

      this.urlService.create(payload).subscribe({
        next: (res:any) => {
          console.log(res);
          this.generatedUrl = res.shortCode;
          this.originalUrl = res.originalUrl;
          localStorage.setItem(
            `token_${res.shortCode}`,
            res.secretToken
          );
          this.sharedService.triggerPageRefresh();
          this.tinyUrlForm.reset();
        },error:(err) =>{
          console.log(err);
        }
      })
    } else {
      this.isError = true;
    }
  }
  copyUrl(): void {
    navigator.clipboard.writeText(this.urlPrefix+this.generatedUrl);
    alert('Copied to clipboard');
  }
}
