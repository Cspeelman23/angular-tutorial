import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) { }
  heroes: Hero[];

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void { // ?
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  add(name: string): void {
  /* why not just call addHero?-- this is a handler--
  creates a Hero-like object from the name w/o the id and passes it to the services addHero() method.
  When addHero saves successfully, the subscribe callback receives the new hero and pushes it into to the heroes list for display.*/
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero); // ?
    this.heroService.deleteHero(hero).subscribe();
  }
}
