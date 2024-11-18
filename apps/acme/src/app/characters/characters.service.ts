import type { Character, CreateCharacter } from "@acme/characters-api";
import { CharacterSchema, CharactersSchema } from "@acme/characters-api";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private readonly path = 'api/v1/characters';

  http = inject(HttpClient);

  retrieveAll() {
    return this.http.get(this.path)
      .pipe(
        map((response) => CharactersSchema.parse(response)),
      );
  }

  retrieveById(id: Character['id']) {
    return this.http.get(`${this.path}/${id}`)
      .pipe(
        map((response) => CharacterSchema.parse(response)),
      );
  }

  create(newCharacter: CreateCharacter) {
    return this.http.post(this.path, newCharacter)
      .pipe(
        map((response) => CharactersSchema.parse(response)),
      );
  }

}
