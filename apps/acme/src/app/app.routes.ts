import { Route } from '@angular/router';

export const appRoutes: Route[] = [{
  path: 'characters',
  children: [{
    path: 'create',
    loadComponent: () => import('./characters/create.component').then(m => m.CreateCharacterComponent),
  }, {
    path: ':id',
    loadComponent: () => import('./characters/character.component').then(m => m.CharacterComponent),
  }, {
    path: '',
    loadComponent: () => import('./characters/characters.component').then(m => m.CharactersComponent),
  }],
}, {
  path: '**',
  redirectTo: 'characters',
}];
