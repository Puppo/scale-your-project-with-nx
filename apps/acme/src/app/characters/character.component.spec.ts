import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { randomUUID } from 'node:crypto';
import { CharacterComponent } from './character.component';
import { CharactersService } from './characters.service';

describe('CharacterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterComponent],
      providers: [
        CharactersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('should render character by id', () => {
    const id = randomUUID();
    const httpTesting = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(CharacterComponent);
    const component = fixture.componentInstance;
    component.id = id;
    const req = httpTesting.expectOne(`api/v1/characters/${id}`);
    req.flush({
      id,
      name: 'acme',
      description: 'description',
      imageUrl: 'https://image.com/image.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const name = compiled.querySelector('h3')?.textContent;
    expect(name).toBe('acme');
    expect(req.request.method).toBe('GET');
  });
});
