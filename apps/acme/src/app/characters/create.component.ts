import { CreateCharacterSchema } from '@acme/characters-api';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CharactersService } from './characters.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'acme-create-characters',
  template: `<h1>Create Character</h1>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        Name
        <input formControlName="name" />
      </label>
      <label>
        Description
        <textarea formControlName="description"></textarea>
      </label>
      <label>
        Image URL
        <input formControlName="imageUrl" />
      </label>
      <button>Create</button>
    </form>
  `,
  styles: `
    form {
      display: grid;
      gap: 1rem;
    }
    label {
      display: grid;
      gap: 0.5rem;
    }
    input, textarea {
      padding: 0.5rem;
    }
    button {
      padding: 0.5rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 0.25rem;
    }
  `
})
export class CreateCharacterComponent {
  characterSv = inject(CharactersService);
  router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    imageUrl: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(png|jpg|jpeg)$/)]),
  });

  async onSubmit() {
    if (this.form.valid) {
      const payload = CreateCharacterSchema.parse(this.form.value);
      await firstValueFrom(this.characterSv.create(payload))
      this.router.navigate(['/characters']);
    }
  }
}
