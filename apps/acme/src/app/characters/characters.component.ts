import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CharactersService } from './characters.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'acme-characters',
  template: `<h2>Characters</h2>
    <ul>
      @for (item of characters(); track item.id) {
        <li>
          <a routerLink="/characters/{{item.id}}">{{item.name}}</a>
          <p>{{item.description}}</p>
        </li>
      } @empty {
        <li aria-hidden="true">There are no items. </li>
      }
    </ul>

    `,
})
export class CharactersComponent {

  charactersSv = inject(CharactersService);

  characters = toSignal(this.charactersSv.retrieveAll());

}
