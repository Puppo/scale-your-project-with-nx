import { CharacterSchema } from '@acme/characters-api';
import { Component, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { CharactersService } from './characters.service';

@Component({
  standalone: true,
  selector: 'acme-character',
  template: `<h2>Character</h2>
    <div>
      @if (character(); as item) {
        <h3>{{item.name}}</h3>
        <img [src]="item.imageUrl" [alt]="item.name" />
      } @else {
        <p aria-hidden="true">Character not found.</p>
      }
    </div>

    `,
})
export class CharacterComponent {
  private id$ = new BehaviorSubject<string | undefined>(undefined);
  protected character = toSignal(this.id$.pipe(
    filter(Boolean),
    switchMap((id) => this.charactersSv.retrieveById(id)),
    map((character) => CharacterSchema.parse(character)),
  ));

  private readonly charactersSv = inject(CharactersService);

  @Input()
  set id(id: string) {
    this.id$.next(id);
  }

}
