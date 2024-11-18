import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'acme-root',
  template: `<h1>Welcome acme</h1>
    <nav>
      <a routerLink="/characters">Characters</a>
      <a routerLink="/characters/create">Create Character</a>
    </nav>

    <router-outlet></router-outlet>`,
  styles: `
    nav {
      display: flex;
      gap: 1rem;
    }
    a {
      padding: 0.5rem;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 0.25rem;

      &:hover {
        background: #0056b3;
      }
    }
  `,
})
export class AppComponent {}
