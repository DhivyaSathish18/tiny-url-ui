import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UrlListComponent } from '../url-list/url-list.component';

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

  constructor(private fb: FormBuilder) {
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
    } else {
      this.isError = true;
    }
  }
}
