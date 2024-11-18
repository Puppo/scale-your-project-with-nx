import { CharacterSchema } from '@acme/characters-api';
import { Component, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { CharactersService } from './characters.service';

@Component({
  standalone: true,
  selector: 'acme-character',
  template: `<h1>Character</h1>
    <div>
      @if (character(); as item) {
        <h1>{{item.name}}</h1>
        <p>{{item.description}}</p>
        <img [src]="item.imageUrl" [alt]="item.name" />
      } @else {
        <p aria-hidden="true">Character not found.</p>
      }
    </div>

    `,
})
export class CharacterComponent {
  id$ = new BehaviorSubject<string | undefined>(undefined);
  character = toSignal(this.id$.pipe(
    filter(Boolean),
    switchMap((id) => this.charactersSv.retrieveById(id)),
    map((character) => CharacterSchema.parse(character)),
  ));

  charactersSv = inject(CharactersService);

  @Input()
  set id(id: string) {
    this.id$.next(id);
  }

}
